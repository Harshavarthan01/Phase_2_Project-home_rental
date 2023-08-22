using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RentVilla.Models;
using RentVilla.Services.Interfaces;

namespace RentVilla.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IUser _user;

        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpPost("UserRegister")]
        public async Task<ActionResult<UserTable>> UserRegister(UserTable userTable)
        {
            var rregister = await _user.UserRegister(userTable);
            return rregister;
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<UserTable>> Users(int userId) 
        {
            var user = await _user.GetUser(userId);
            return user;
        }
        [HttpPost("Userlogin")]
        public async Task<ActionResult<Login>> UserLogin(Login user)
        {
            var rregister = await _user.UserLogin(user);
            return rregister;
        }

        [HttpPut("UpdateUserDetails")]
        public async Task<ActionResult<UserTable>> UpdateUserDetails(int userId, UserTable userTable)
        {
            try
            {
                var user=await _user.UpdateUserDetails(userId,userTable);
                return Ok(user);    
            }catch (Exception ex)
            {
                return NotFound(ex.Message);    
            }
        }

        [HttpGet("GetMyproperties")]
        public async Task<ActionResult<List<PropertyTable>>> MyProperties(int userId)
        {
            try
            {
                var myproperties = await _user.MyProperties(userId);
                return Ok(myproperties);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("GetWishlist")]
        public async Task<ActionResult<List<PropertyTable>>> Wishlist(int userId)
        {
            try
            {
                var wishlist = await _user.Wishlist(userId);
                return Ok(wishlist);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
