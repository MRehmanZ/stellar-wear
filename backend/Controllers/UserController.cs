using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ApplicationUser>> GetUsers()
        {
            return Ok(_userManager.Users.ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> CreateUser(ApplicationUser user)
        {
            var result = await _userManager.CreateAsync(user, "DefaultPassword123!");
            if (result.Succeeded) return Ok(user);
            return BadRequest(result.Errors);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, ApplicationUser user)
        {
            var existingUser = await _userManager.FindByIdAsync(id.ToString());
            if (existingUser == null) return NotFound();
            existingUser.UserName = user.UserName;
            existingUser.Email = user.Email;
            await _userManager.UpdateAsync(existingUser);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return NotFound();
            await _userManager.DeleteAsync(user);
            return NoContent();
        }
    }

}
