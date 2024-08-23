// Services/PaymentService.cs
using Backend.Models;
using Stripe;
using Stripe.Checkout;

namespace Backend.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _configuration;

        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

        public async Task<Session> CreateCheckoutSessionAsync(List<OrderItem> orderItems)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = orderItems.Select(item => new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "gbp",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.ProductName,
                        },
                        UnitAmount = (long)(item.Price * 100),
                    },
                    Quantity = item.Quantity,
                }).ToList(),
                Mode = "payment",
                SuccessUrl = "https://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "https://localhost:5173/checkout",
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);
            return session;
        }
    }
}
