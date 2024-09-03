namespace Backend.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public string Size { get; set; }
        public string Color { get; set; }
    }
}
