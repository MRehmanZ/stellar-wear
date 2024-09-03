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
                    Sizes = new List<string> { "38", "40", "42", "44" },
                    Colors = new List<string> { "Black", "Charcoal" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 4, Comment = "Great quality suit.", UserName = "John Doe" },
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "Perfect fit and finish.", UserName = "Jane Smith" }
                    }
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
                    Sizes = new List<string> { "One Size" },
                    Colors = new List<string> { "Blue" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "Matches perfectly with my suit.", UserName = "Alice Brown" }
                    }
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
                    Sizes = new List<string> { "8", "9", "10", "11" },
                    Colors = new List<string> { "Brown" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "Very comfortable and stylish.", UserName = "Charlie Davis" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Stylish Grey Suit",
                    Description = "A modern grey suit for the contemporary gentleman.",
                    Price = 329.99M,
                    Category = "Suits",
                    Rating = 5,
                    ImageUrl = "/images/products/grey-suit.jpg",
                    Sizes = new List<string> { "38", "40", "42", "44" },
                    Colors = new List<string> { "Grey", "Charcoal" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 4, Comment = "Good quality but slightly tight.", UserName = "Edward Green" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Red Silk Tie",
                    Description = "A luxurious red silk tie to make a bold statement.",
                    Price = 59.99M,
                    Category = "Ties",
                    Rating = 3,
                    ImageUrl = "/images/products/red-silk-tie.jpg",
                    Sizes = new List<string> { "One Size" },
                    Colors = new List<string> { "Red" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 3, Comment = "Color is not as vibrant as expected.", UserName = "Frank White" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Navy Wool Suit",
                    Description = "A sophisticated navy wool suit, ideal for business and formal events.",
                    Price = 349.99M,
                    Category = "Suits",
                    Rating = 5,
                    ImageUrl = "/images/products/navy-wool-suit.jpg",
                    Sizes = new List<string> { "38", "40", "42", "44" },
                    Colors = new List<string> { "Navy" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "High quality fabric and perfect fit.", UserName = "George Clark" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Leather Oxford Shoes",
                    Description = "Classic black leather Oxford shoes for a polished and professional look.",
                    Price = 199.99M,
                    Category = "Shoes",
                    Rating = 5,
                    ImageUrl = "/images/products/leather-oxford-shoes.jpg",
                    IsFeatured = false,
                    Sizes = new List<string> { "8", "9", "10", "11", "12" },
                    Colors = new List<string> { "Black" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "Comfortable and elegant. Perfect for the office.", UserName = "Henry King" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Slim Fit Dress Shirt",
                    Description = "A crisp white slim fit dress shirt, essential for any wardrobe.",
                    Price = 59.99M,
                    Category = "Shirts",
                    ImageUrl = "/images/products/slim-fit-dress-shirt.jpg",
                    Sizes = new List<string> { "S", "M", "L", "XL" },
                    Colors = new List<string> { "White" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 4, Comment = "Great fit but wrinkles easily.", UserName = "James Lee" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Luxury Silk Pocket Square",
                    Description = "Add a touch of elegance to your suit with this luxury silk pocket square.",
                    Price = 29.99M,
                    Category = "Accessories",
                    Rating = 5,
                    ImageUrl = "/images/products/silk-pocket-square.jpg",
                    Sizes = new List<string> { "One Size" },
                    Colors = new List<string> { "Burgundy", "Navy", "Grey" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "Perfect accent for my suits.", UserName = "Chris Baker" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Men's Chronograph Watch",
                    Description = "A stylish chronograph watch with a stainless steel band.",
                    Price = 249.99M,
                    Category = "Watches",
                    Rating = 4,
                    ImageUrl = "/images/products/chronograph-watch.jpg",
                    IsFeatured = true,
                    Sizes = new List<string> { "One Size" },
                    Colors = new List<string> { "Silver", "Black" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 4, Comment = "Elegant design but slightly heavy.", UserName = "Daniel Wilson" }
                    }
                },
                new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Black Leather Belt",
                    Description = "A versatile black leather belt with a polished silver buckle.",
                    Price = 39.99M,
                    Category = "Accessories",
                    Rating = 5,
                    ImageUrl = "/images/products/black-leather-belt.jpg",
                    Sizes = new List<string> { "32", "34", "36", "38", "40" },
                    Colors = new List<string> { "Black" },
                    Reviews = new List<Review>
                    {
                        new Review { Id = Guid.NewGuid(), Rating = 5, Comment = "Solid construction and looks great.", UserName = "Martin Cook" }
                    }
                }
            };

            context.Products.AddRange(products);
            await context.SaveChangesAsync();
        }
    }
}
