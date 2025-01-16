namespace APITask;

public interface ICreateRepo<T> where T : class
{
    Task CreateNewAsync(T entity);
    Task SaveAsync();

}
