using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class CheckoutController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly BackendDbContext _context;

    public CheckoutController(BackendDbContext context, IConfiguration configuration)
    {
        _configuration = configuration;
        StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        _context = context;
    }

    [HttpPost("create-payment-intent")]
    public async Task<IActionResult> CreatePaymentIntent([FromBody] Guid orderId)
    {
        var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            return NotFound("Order not found.");
        }

        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(order.OrderItems.Sum(item => item.Price * item.Quantity) * 100), // Convert to cents
            Currency = "gbp",
            Metadata = new Dictionary<string, string>
        {
            { "OrderId", order.Id.ToString() },
            { "UserId", order.UserId.ToString() }
        }
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        // Save the PaymentIntentId to the order
        order.PaymentIntentId = paymentIntent.Id;
        await _context.SaveChangesAsync();

        return Ok(new { clientSecret = paymentIntent.ClientSecret });
    }

    private long CalculateOrderAmount(List<OrderItem> items)
    {
        // Calculate the total order amount (convert to cents)
        return items.Sum(item => (long)(item.Price * item.Quantity * 100));
    }
}
