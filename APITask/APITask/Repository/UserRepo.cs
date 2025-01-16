

using Microsoft.EntityFrameworkCore;
using BCrypt;
namespace APITask;

public class UserRepo : CreateRepo<User>, IUserRepo
{
    ApplicationDbContext _context;
    public UserRepo(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public string HashPassword(string userPs)
    {
        string hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(userPs);
        return hashedPassword;
    }

    public async Task<bool> IsUserUnique(User user)
    {
        User foundUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

        if (foundUser == null)
        {
            return true;
        }
        return false;
    }






}
