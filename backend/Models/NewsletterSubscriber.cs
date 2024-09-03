using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class NewsletterSubscriber
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public DateTime SubscribedAt { get; set; }
    }
}
