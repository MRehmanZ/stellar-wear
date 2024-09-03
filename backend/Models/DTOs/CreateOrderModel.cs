namespace Backend.Models.DTOs
{
    public class CreateOrderModel
    {
        public Guid UserId { get; set; } 
        public string PaymentIntentId { get; set; } 
        public Guid AddressId { get; set; } 

        public decimal TotalAmount { get; set; }

        public List<OrderItemDTO> Items { get; set; } = new List<OrderItemDTO>();
    }
}
