// Models/Order.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; } // Required
        public Guid UserId { get; set; } // Required
        public string PaymentIntentId { get; set; } // Required
        public string Status { get; set; } // Required
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }

        public ApplicationUser User { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }



}
