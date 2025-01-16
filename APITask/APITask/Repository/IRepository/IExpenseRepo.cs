namespace APITask;

public interface IExpenseRepo
{
    public Task UpdateExpense(Expense entity);
    public Task DeleteExpense(Expense entity);
}
