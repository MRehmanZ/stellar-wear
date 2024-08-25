using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Seeds
{
    public static class CategorySeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var context = new BackendDbContext(serviceProvider.GetRequiredService<DbContextOptions<BackendDbContext>>());

            if (context.Categories.Any())
            {
                // Categories have already been seeded.
                return;
            }

            // Define the categories to seed.
            var categories = new Category[]
            {
                new Category { Id = Guid.NewGuid(), Name = "Ties" },
                new Category { Id = Guid.NewGuid(), Name = "Suits" },
                new Category { Id = Guid.NewGuid(), Name = "Shoes" },
                new Category { Id = Guid.NewGuid(), Name = "Shirts" },
            };

            // Add categories to the database.
            context.Categories.AddRange(categories);

            // Save changes to the database.
            await context.SaveChangesAsync();
        }
    }
}
