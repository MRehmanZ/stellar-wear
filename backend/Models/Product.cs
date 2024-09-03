using Stripe;
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Product
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        public List<string> Sizes { get; set; } = new List<string>(); // Initialize the list
        public List<string> Colors { get; set; } = new List<string>();

        [Required]
        public string Category { get; set; }  // Add Category

        public int Rating { get; set; }  // Add Rating

        [Required]
        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Boolean IsFeatured { get; set; } = false;

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }

}
