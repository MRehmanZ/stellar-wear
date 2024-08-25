using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Seeds
{
    public static class AdminSeeder
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string[] roleNames = { "Admin", "User" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
                }
            }

            var adminEmail = "mrzulfiquar@gmail.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                adminUser = new ApplicationUser { UserName = "admin", Email = adminEmail };
                await userManager.CreateAsync(adminUser, "@Hello1234"); 
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}
