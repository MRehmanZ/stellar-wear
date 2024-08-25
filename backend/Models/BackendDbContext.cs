﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class BackendDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options) { }

        // Add the Categories DbSet
        public DbSet<Category> Categories { get; set; }

        // Existing DbSets
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ApplicationUser
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("AspNetUsers");
            });

            // Configure Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Categories");
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Name).IsRequired().HasMaxLength(100);
            });

            // Configure Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
                entity.Property(p => p.Description).HasMaxLength(1000);
                entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
                entity.Property(p => p.ImageUrl).HasMaxLength(500);
                entity.Property(p => p.Category).HasMaxLength(100);
                entity.Property(p => p.Rating).HasDefaultValue(0);
                entity.Property(p => p.IsFeatured).HasDefaultValue(false);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Orders");
                entity.HasKey(o => o.Id);
                entity.Property(o => o.OrderNumber).IsRequired().HasMaxLength(50);
                entity.Property(o => o.Status).IsRequired().HasMaxLength(50);
                entity.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
                entity.Property(o => o.CreatedAt).HasDefaultValueSql("GETDATE()");

                entity.HasOne(o => o.User)
                      .WithMany(u => u.Orders)
                      .HasForeignKey(o => o.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configure OrderItem
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("OrderItems");
                entity.HasKey(oi => oi.Id); // Assuming the use of a primary key on Id
                entity.Property(oi => oi.ProductName).IsRequired().HasMaxLength(200);
                entity.Property(oi => oi.Price).HasColumnType("decimal(18,2)");
                entity.Property(oi => oi.Quantity).IsRequired();

                entity.HasOne(oi => oi.Order)
                      .WithMany(o => o.OrderItems)
                      .HasForeignKey(oi => oi.OrderId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(oi => oi.Product)
                      .WithMany() // Assuming no navigation property back to OrderItem
                      .HasForeignKey(oi => oi.ProductId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
