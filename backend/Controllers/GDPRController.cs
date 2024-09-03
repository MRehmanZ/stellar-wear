using Backend.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GDPRController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GDPRController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // Get user's personal data
        [HttpGet("get-user-data")]
        public async Task<IActionResult> GetUserData()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            // Return user data
            return Ok(new
            {
                user.UserName,
                user.Email,
                user.PhoneNumber
                // Add other relevant data fields
            });
        }

        // Update user's personal data
        [HttpPut("update-user-data")]
        public async Task<IActionResult> UpdateUserData([FromBody] UpdateUserModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            // Update other relevant fields

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("User data updated successfully");
        }

        // Delete user's personal data
        [HttpDelete("delete-user-data")]
        public async Task<IActionResult> DeleteUserData()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok("User account and data deleted successfully");
        }
    }
}
