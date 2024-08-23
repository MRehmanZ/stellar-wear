namespace Backend.Models.DTOs
{
    public class OrderItemDTO
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        // Exclude Order and Product navigation properties
    }
}
