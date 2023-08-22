using Microsoft.EntityFrameworkCore;
using RentVilla.GlobalException;
using RentVilla.Models;
using RentVilla.Services.Interfaces;

namespace RentVilla.Services
{
    public class UserService : IUser
    {
        public RentVillaContext? _rentVillaContext;

        public UserService(RentVillaContext? rentVillaContext)
        {
            _rentVillaContext = rentVillaContext;
        }

        public async Task<UserTable> UserRegister(UserTable userTable)
        {
            await _rentVillaContext.AddAsync(userTable);
            await _rentVillaContext.SaveChangesAsync();
            var user = await _rentVillaContext.UserTables.FindAsync(userTable.UserId);
            return user;
        }

        public async Task<UserTable> GetUser(int userId)
        {
            var user = await _rentVillaContext.UserTables.FindAsync(userId);
            return user;
        }
        public async Task<Login> UserLogin(Login user)
        {
            var l_user = await _rentVillaContext.UserTables.FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);
            if (l_user == null)
            {
                throw new Exception("Not found");
            }
            else
            {
                return user;
            }
        }

        public async Task<UserTable> UpdateUserDetails(int userId, UserTable userTable)
        {
            var user = await _rentVillaContext.UserTables.FindAsync(userId);
            if (user == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
            else
            {
                user.UserName=userTable.UserName;
                user.Email=userTable.Email;
                user.Password=userTable.Password;
                user.Phone=userTable.Phone;
                user.UserRole=userTable.UserRole;
                await _rentVillaContext.SaveChangesAsync();
                return await _rentVillaContext.UserTables.FindAsync(userId);
                  
            }
        }

        public async Task<List<PropertyTable>> MyProperties(int userId)
        {
            var myProperties = await _rentVillaContext.PropertyTables.Where(n => n.UserId == userId).ToListAsync();
            if (myProperties == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
            else
            {
                return myProperties;
            }
        }

        public async Task<List<PropertyTable>> Wishlist(int userId)
        {
            var combinedData = from  propertyTable in _rentVillaContext.PropertyTables
                               join wishlistTable in _rentVillaContext.WishlistTables
                               on propertyTable.PropertyId equals wishlistTable.PropertyId
                               where wishlistTable.UserId == userId
                               select propertyTable;
            var myProperties = await combinedData.ToListAsync();
            if (myProperties == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
            else
            {
                return myProperties;
            }
        }
    }
}
