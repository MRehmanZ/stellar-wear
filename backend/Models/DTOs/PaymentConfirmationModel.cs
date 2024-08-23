namespace Backend.Models.DTOs
{
    public class PaymentConfirmationModel
    {
        public string PaymentIntentId { get; set; } // Stripe Payment Intent ID
        public Guid UserId { get; set; } // ID of the user making the order
        public List<OrderItemDTO> Items { get; set; } // List of items in the order
    }

}
