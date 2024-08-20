using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace Backend.Models
{
    public class BackendDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }

        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options) { }
    }
}