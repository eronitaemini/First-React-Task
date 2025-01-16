
using Microsoft.EntityFrameworkCore;

namespace APITask;

public class CreateRepo<T> : ICreateRepo<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> dbset;
    public CreateRepo(ApplicationDbContext context)
    {
        _context = context;
        dbset = _context.Set<T>();

    }
    public async Task CreateNewAsync(T entity)
    {
        await dbset.AddAsync(entity);
        await SaveAsync();
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await dbset.ToListAsync();
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}
