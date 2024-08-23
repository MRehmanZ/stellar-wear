namespace Backend.Models.DTOs
{
    public class PaymentConfirmationModel
    {
        public string PaymentIntentId { get; set; } // Stripe Payment Intent ID
        public Guid UserId { get; set; } // ID of the user making the order
        public List<OrderItemDTO> Items { get; set; } // List of items in the order
    }

    public class OrderItemDTO
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        // Exclude Order and Product navigation properties
    }

}
