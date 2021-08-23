using System.ComponentModel.DataAnnotations;

namespace TaskManager.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [MinLength(4)]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string RoleName { get; set; }



    }
}