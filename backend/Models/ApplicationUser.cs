using Microsoft.AspNetCore.Identity;
using System;

namespace Backend.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {


        // Navigation properties
        public ICollection<Order> Orders { get; set; }
    }
}


