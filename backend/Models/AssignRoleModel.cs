using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class AssignRoleModel
    {
        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
        public string RoleName { get; set; }
    }
}
