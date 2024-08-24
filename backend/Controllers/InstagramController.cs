namespace Backend.Controllers
{
    using System.Threading.Tasks;
    using Backend.Services;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class InstagramController : ControllerBase
    {
        private readonly InstagramService _instagramService;

        public InstagramController(InstagramService instagramService)
        {
            _instagramService = instagramService;
        }

        [HttpGet("latest-posts")]
        public async Task<IActionResult> GetLatestPosts()
        {
            try
            {
                var posts = await _instagramService.GetLatestPostsAsync();
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

}
