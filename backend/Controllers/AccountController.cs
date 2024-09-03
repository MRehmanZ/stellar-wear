using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AuthService _authService;

        public AccountController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }

            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await _authService.RegisterAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _authService.AddRole(user, "User");
                var token = await _authService.GenerateEmailConfirmationTokenAsync(user);
                var verificationLink = Url.Action("VerifyEmail", "Account", new
                {
                    userId = user.Id,
                    token = token
                }, Request.Scheme);

                await _authService.SendVerificationEmailAsync(user, token, verificationLink);

                return Ok("User registered successfully. An email verification link has been sent.");
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(string userId, string token)
        {
            var user = await _authService.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var result = await _authService.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email verification successful.");
            }

            return BadRequest("Email verification failed.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _authService.FindByEmailOrUsernameAsync(model.UsernameOrEmail);
            if (!await _authService.CheckEmailConfirmation(user))
            {
                return Unauthorized("Please verify your email before logging in.");
            }
            if (user == null)
            {
                return Unauthorized("Invalid login attempt.");
            }

            var result = await _authService.PasswordSignInAsync(user.UserName, model.Password);
            if (result.Succeeded)
            {
                var roles = await _authService.GetRolesAsync(user);
                var token = _authService.GenerateJwtToken(user, roles);
                return Ok(new { Token = token, UserId = user.Id }); // Return UserId
            }

            return Unauthorized("Invalid login attempt.");
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.SignOutAsync();
            return Ok("Logged out");
        }
    }
}
