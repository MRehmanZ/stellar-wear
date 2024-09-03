using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterController : ControllerBase
    {
        private readonly BackendDbContext _context;

        public NewsletterController(BackendDbContext context)
        {
            _context = context;
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> SubscribeToNewsletter([FromBody] SubscribeNewsletterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingSubscriber = await _context.NewsletterSubscribers
                .FirstOrDefaultAsync(s => s.Email == model.Email);

            if (existingSubscriber != null)
                return BadRequest("You are already subscribed.");

            var subscriber = new NewsletterSubscriber
            {
                Id = Guid.NewGuid(),
                Email = model.Email,
                SubscribedAt = DateTime.UtcNow
            };

            _context.NewsletterSubscribers.Add(subscriber);
            await _context.SaveChangesAsync();

            return Ok("Subscribed successfully");
        }
    }

    public class SubscribeNewsletterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
