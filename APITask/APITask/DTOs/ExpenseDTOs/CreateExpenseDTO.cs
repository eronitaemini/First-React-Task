using System.ComponentModel.DataAnnotations;

namespace APITask;

public class CreateExpenseDTO
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Value { get; set; }
    public string CategoryId { get; set; }
}
