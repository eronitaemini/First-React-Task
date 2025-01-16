

namespace APITask;

public class ExpenseRepo : IExpenseRepo
{
    private readonly ApplicationDbContext _context;
    public ExpenseRepo(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task DeleteExpense(Expense entity)
    {
        _context.Expenses.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateExpense(Expense entity)
    {
        entity.UpdatedAt = DateTime.Now;
        _context.Expenses.Update(entity);
        await _context.SaveChangesAsync();
    }
}
