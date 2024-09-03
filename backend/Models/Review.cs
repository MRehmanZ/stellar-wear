// Models/Review.cs
using System;

namespace Backend.Models
{
    public class Review
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string UserName { get; set; }
        public int Rating { get; set; } // Rating out of 5
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }

        public Product Product { get; set; }
    }
}
