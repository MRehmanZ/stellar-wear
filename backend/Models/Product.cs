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

        [Required]
        public string Category { get; set; }  // Add Category

        public int Rating { get; set; }  // Add Rating

        [Required]
        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Boolean isFeatured { get; set; } = false;
    }

}
