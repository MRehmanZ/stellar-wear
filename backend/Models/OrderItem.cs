namespace Backend.Models
{
    public class OrderItem
    {
        public Guid Id { get; set; } // Unique identifier for the order item

        public Guid OrderId { get; set; } // ID of the associated order
        public Guid ProductId { get; set; } // ID of the associated product

        public string ProductName { get; set; } // Name of the product
        public decimal Price { get; set; } // Price of the product at the time of the order
        public int Quantity { get; set; } // Quantity of the product in the order

        public Order Order { get; set; } // Navigation property for the associated order
        public Product Product { get; set; } // Navigation property for the associated product
    }

}
