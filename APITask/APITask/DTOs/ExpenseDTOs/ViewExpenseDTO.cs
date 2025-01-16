namespace APITask;

public class ViewExpenseDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public float Value { get; set; }
    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public Category Category { get; set; }
}
