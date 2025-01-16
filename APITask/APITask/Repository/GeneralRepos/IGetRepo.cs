using System.Linq.Expressions;

namespace APITask;

public interface IGetRepo<T> where T : class
{

    public Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>> include = null);
    public Task<T> GetByIdAsync(int id);
}
