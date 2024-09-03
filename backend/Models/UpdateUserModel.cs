using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UpdateUserModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }
    }

}
