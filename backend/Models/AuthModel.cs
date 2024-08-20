using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class AuthModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
