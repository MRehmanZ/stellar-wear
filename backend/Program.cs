using Backend.Models;
using Backend.Services;
using Backend.Controllers;
using Backend.Seeds;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Stripe;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Configure Entity Framework Core with SQL Server
            builder.Services.AddDbContext<BackendDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("Connection")));

            // Configure Identity
            builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
            {
                options.User.RequireUniqueEmail = false; // for testing purposes
            })
                .AddEntityFrameworkStores<BackendDbContext>()
                .AddDefaultTokenProviders();

            // Configure email settings from appsettings.json
            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

            builder.Services.AddHttpClient();

            // Add custom services (EmailService, AuthService)
            builder.Services.AddScoped<EmailService>();
            builder.Services.AddScoped<PaymentService>();
            builder.Services.AddScoped<AuthService>();
            builder.Services.AddScoped<InstagramService>();

            StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

            // Configure JWT authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });

            // Add Swagger/OpenAPI for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure JSON serializer options
            builder.Services.AddControllersWithViews()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                });

            // Configure CORS to allow requests from the React frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReact", builder =>
                {
                    builder.WithOrigins("http://localhost:5173") // Replace with your React frontend URL
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();  // For detailed exception info in development
                app.UseSwagger();                 // Enable Swagger in development
                app.UseSwaggerUI();               // Enable Swagger UI in development
            }

            // Middleware pipeline
            app.UseHttpsRedirection();            // Redirect HTTP requests to HTTPS
            app.UseStaticFiles();                 // Serve static files

            app.UseRouting();                     // Enable routing

            app.UseCors("AllowReact");            // Enable CORS for React frontend

            app.UseAuthentication();              // Enable authentication
            app.UseAuthorization();               // Enable authorization

            // Set up routing for controllers
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.MapControllers();                 // Enable attribute routing

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<BackendDbContext>();

                try
                {
                    context.Database.Migrate();
                    ProductSeeder.SeedAsync(services).Wait(); // Run the product seeder
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the database.");
                }
            }

            app.Run();  // Run the application
        }
    }
}
