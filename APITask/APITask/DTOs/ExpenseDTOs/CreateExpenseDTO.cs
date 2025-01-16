using System.ComponentModel.DataAnnotations;

namespace APITask;

public class CreateExpenseDTO
{
    [Required]
    public string Title { get; set; }
    [Required]
    public float Value { get; set; }
    public int CategoryId { get; set; }
}
