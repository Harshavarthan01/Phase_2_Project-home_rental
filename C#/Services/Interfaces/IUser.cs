using RentVilla.Models;

namespace RentVilla.Services.Interfaces
{
    public interface IUser
    {
        Task<UserTable> UserRegister(UserTable userTable);
        Task<UserTable> GetUser(int userId);
        Task<UserTable> UserLogin(Login user);
        Task<UserTable> UpdateUserDetails(UserTable userTable);
        Task<List<PropertyTable>> MyProperties(int userId);
        Task<List<PropertyTable>> Wishlist(int userId);
        Task<UserTable> ChangeUserRole(int userId);
        Task<String> WishListAdd(WishlistTable wishlistTable);
        Task<String> WishListRemove(int userId,int propertyId);

    }
}
