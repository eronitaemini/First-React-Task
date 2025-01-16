using System.ComponentModel.DataAnnotations;

namespace APITask;

public class CreateUserDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string confirmPassword { get; set; }
}
