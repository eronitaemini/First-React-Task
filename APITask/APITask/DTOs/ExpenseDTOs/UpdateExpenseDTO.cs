using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APITask;

public class UpdateExpenseDTO
{

    [Required]
    public int Id { get; set; }
    public string Title { get; set; }
    public float Value { get; set; }
    public int CategoryId { get; set; }

}
