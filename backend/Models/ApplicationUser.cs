using Microsoft.AspNetCore.Identity;
using System;

namespace Backend.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ICollection<IdentityUserRole<Guid>> UserRoles { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}


