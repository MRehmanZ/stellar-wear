namespace Backend.Models
{
    public class OrderItem
    {
        public Guid Id { get; set; }  // Primary key
        public Guid OrderId { get; set; }  // Foreign key to Order
        public Guid ProductId { get; set; }  // Foreign key to Product
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }


        public Order Order { get; set; }  // Navigation property to Order
        public Product Product { get; set; }  // Navigation property to Product
    }
}
