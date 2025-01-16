
namespace APITask;

public interface IUserRepo : ICreateRepo<User>
{
    Task<bool> IsUserUnique(User user);
    string HashPassword(string userPs);


}
