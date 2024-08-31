using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Address
    {
        public Guid Id { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public Guid UserId { get; set; }
    }
}
