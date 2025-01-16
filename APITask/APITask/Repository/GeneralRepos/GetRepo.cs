
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace APITask;

public class GetRepo<T> : IGetRepo<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> dbset;

    public GetRepo(ApplicationDbContext context)
    {
        _context = context;
        dbset = _context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IQueryable<T>> include = null)
    {

        IQueryable<T> query = dbset;
        if (include != null)
        {

            query = include(query);
        }
        return await query.ToListAsync();

    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await dbset.FindAsync(id);
    }


}
