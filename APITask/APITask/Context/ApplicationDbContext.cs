using Microsoft.EntityFrameworkCore;

namespace APITask;

public class ApplicationDbContext : DbContext
{

    public DbSet<User> Users { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    // protected override void OModelCreating(ModelBuilder modelBuilder)
    // {
    //     modelBuilder.Entity<Expense>()
    //         .HasOne(e => e.Category)
    //         .WithMany(c => c.Expense)
    //         .HasForeignKey(e => e.CategoryId);

    //     base.OnModelCreating(modelBuilder);
    // }

}
