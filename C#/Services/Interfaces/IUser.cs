using RentVilla.Models;

namespace RentVilla.Services.Interfaces
{
    public interface IUser
    {
        Task<UserTable> UserRegister(UserTable userTable);
        Task<UserTable> GetUser(int userId);
        Task<Login> UserLogin(Login user);
        Task<UserTable> UpdateUserDetails(int userId, UserTable userTable);
        Task<List<PropertyTable>> MyProperties(int userId);
        Task<List<PropertyTable>> Wishlist(int userId);


    }
}
