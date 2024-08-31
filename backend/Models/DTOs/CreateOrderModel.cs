namespace Backend.Models.DTOs
{
    public class CreateOrderModel
    {
        public Guid UserId { get; set; } // Required
        public string PaymentIntentId { get; set; } // Required
        public Guid AddressId { get; set; } // Required

        public decimal TotalAmount { get; set; }

        public List<OrderItemDTO> Items { get; set; } = new List<OrderItemDTO>();
    }
}
