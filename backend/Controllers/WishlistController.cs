using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly BackendDbContext _context;

        public WishlistController(BackendDbContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToWishlist([FromBody] AddToWishlistModel model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var product = await _context.Products.FindAsync(model.ProductId);
            if (product == null) return NotFound("Product not found.");

            var wishlistItem = new WishlistItem
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userId),
                ProductId = model.ProductId,
                CreatedAt = DateTime.UtcNow
            };

            _context.WishlistItems.Add(wishlistItem);
            await _context.SaveChangesAsync();

            return Ok(wishlistItem);
        }

        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveFromWishlist(Guid productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var wishlistItem = await _context.WishlistItems
                .FirstOrDefaultAsync(w => w.UserId == Guid.Parse(userId) && w.ProductId == productId);

            if (wishlistItem == null) return NotFound("Item not found in wishlist.");

            _context.WishlistItems.Remove(wishlistItem);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetWishlist()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var wishlist = await _context.WishlistItems
                .Include(w => w.Product)
                .Where(w => w.UserId == Guid.Parse(userId))
                .ToListAsync();

            return Ok(wishlist);
        }
    }

    public class AddToWishlistModel
    {
        public Guid ProductId { get; set; }
    }
}
