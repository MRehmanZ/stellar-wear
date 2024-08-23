namespace Backend.Models.DTOs
{
    public class CreateOrderModel
    {
        public Guid UserId { get; set; } // Required
        public string PaymentIntentId { get; set; } // Required
        public List<OrderItemModel> Items { get; set; } = new List<OrderItemModel>();
    }

    public class OrderItemModel
    {
        public Guid ProductId { get; set; } // Required
        public string ProductName { get; set; } // Required
        public decimal Price { get; set; } // Required
        public int Quantity { get; set; } // Required
    }
}
