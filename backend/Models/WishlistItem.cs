using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class WishlistItem
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime CreatedAt { get; set; }

        public ApplicationUser User { get; set; }
        public Product Product { get; set; }
    }
}
