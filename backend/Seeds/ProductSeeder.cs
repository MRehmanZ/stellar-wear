using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Seeds
{
    public static class ProductSeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var context = new BackendDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<BackendDbContext>>());

            // Check if there are already products in the database
            if (context.Products.Any())
            {
                return;   // DB has been seeded
            }

            var products = new List<Product>
            {
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Classic Black Suit",
                    Description = "A timeless black suit perfect for any formal occasion.",
                    Price = 299.99M,
                    Category = "Suits",
                    Rating = 4,
                    ImageUrl = "/images/products/black-suit.jpg",
                    IsFeatured = true,
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Elegant Blue Tie",
                    Description = "An elegant blue tie to complement any suit.",
                    Price = 49.99M,
                    Category = "Ties",
                    Rating = 5,
                    ImageUrl = "/images/products/blue-tie.jpg",
                    IsFeatured = true,
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Brown Leather Shoes",
                    Description = "High-quality brown leather shoes, perfect for formal wear.",
                    Price = 149.99M,
                    Category = "Shoes",
                    Rating = 5,
                    ImageUrl = "/images/products/brown-leather-shoes.jpg",
                    IsFeatured = true,
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Stylish Grey Suit",
                    Description = "A modern grey suit for the contemporary gentleman.",
                    Price = 329.99M,
                    Category = "Suits",
                    Rating = 5,
                    ImageUrl = "/images/products/grey-suit.jpg"
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Red Silk Tie",
                    Description = "A luxurious red silk tie to make a bold statement.",
                    Price = 59.99M,
                    Category = "Ties",
                    Rating = 3,
                    ImageUrl = "/images/products/red-silk-tie.jpg"
                }
            };

            context.Products.AddRange(products);
            await context.SaveChangesAsync();
        }
    }
}
