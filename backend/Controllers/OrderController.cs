using Backend.Models;
using Backend.Models.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Ensure only authenticated users can access this controller
    public class OrderController : ControllerBase
    {
        private readonly BackendDbContext _context;
        private readonly PaymentService _paymentService;
        //private readonly ILogger<OrderController> _logger;

        public OrderController(BackendDbContext context, PaymentService paymentService, ILogger<OrderController> logger)
        {
            _context = context;
            _paymentService = paymentService;
            //_logger = logger;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var address = await _context.Addresses.FindAsync(model.AddressId);
                if (address == null || address.UserId != model.UserId)
                {
                    return BadRequest("Invalid address.");
                }

                var order = new Order
                {
                    Id = Guid.NewGuid(),
                    OrderNumber = Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
                    UserId = model.UserId,
                    PaymentIntentId = model.PaymentIntentId,
                    Status = "Pending",
                    TotalAmount = model.TotalAmount,
                    CreatedAt = DateTime.UtcNow,
                    Address = address,
                    OrderItems = model.Items.Select(i => new OrderItem
                    {
                        Id = Guid.NewGuid(),
                        ProductId = i.ProductId,
                        ProductName = i.ProductName,
                        Price = i.Price,
                        Quantity = i.Quantity,
                        ImageUrl = i.ImageUrl,
                        
                    }).ToList()
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                return Ok(new { OrderId = order.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating the order.");
            }
        }



        [HttpPost("create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentModel model)
        {
            try
            {
                if (!Guid.TryParse(model.OrderId, out var parsedOrderId))
                {
                    return BadRequest("Invalid order ID.");
                }

                var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == parsedOrderId);

                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                var totalAmount = (long)(order.TotalAmount * 100); // Convert to cents

                if (totalAmount < 50) // Example: minimum charge of £0.50 in GBP (50 pence)
                {
                    return BadRequest("The total amount is too low to be processed. Please add more items to your cart. Your amount: " + totalAmount);
                }

                var options = new PaymentIntentCreateOptions
                {
                    Amount = totalAmount,
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
            catch (Exception ex)
            {
                // Log the exception and return a proper error message
                //_logger.LogError(ex, "Error creating payment intent.");
                return StatusCode(500, "An error occurred while creating the payment intent.");
            }
        }



        [HttpPost("confirm-payment")]
        public async Task<IActionResult> ConfirmPayment([FromBody] PaymentConfirmationModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.PaymentIntentId) || model.Items == null || model.Items.Count == 0)
            {
                return BadRequest("Invalid payment data or items not provided.");
            }

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.PaymentIntentId == model.PaymentIntentId);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            // Update each order item with the correct order reference
            foreach (var item in model.Items)
            {
                var orderItem = new OrderItem
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    OrderId = order.Id,
                    ImageUrl = item.ImageUrl,
                };

                _context.OrderItems.Add(orderItem);
            }

            // Update the order status to completed
            order.Status = "Completed";
            await _context.SaveChangesAsync();

            // Return the updated order details
            return Ok(order);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(Guid id)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst("sub")?.Value);
                var order = await _context.Orders
                                          .Include(o => o.OrderItems)
                                          .Include(o => o.Address) // Include the address
                                          .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                return Ok(order);
            }
            catch (Exception ex)
            {
                // Log the error and return a proper message
                return StatusCode(500, "An error occurred while fetching the order.");
            }
        }



        [HttpGet("user-orders")]
        public async Task<IActionResult> GetUserOrders()
        {
            var userId = Guid.Parse(User.FindFirst("sub")?.Value);
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.OrderItems).ToListAsync();
        }

    }

    public class ConfirmPaymentRequest
    {
        public string PaymentIntentId { get; set; }
    }
}