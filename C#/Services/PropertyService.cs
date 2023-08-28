using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RentVilla.GlobalException;
using RentVilla.Models;
using RentVilla.Services.Interfaces;
using System.Runtime.InteropServices;

namespace RentVilla.Services
{
    public class PropertyService : IProperty
    {
        public RentVillaContext _rentVillaContext;

        public PropertyService(RentVillaContext rentVillaContext)
        {
            _rentVillaContext = rentVillaContext;
        }

        public async Task<PropertyTable> AddProperty(PropertyTable table)
        {
            await _rentVillaContext.PropertyTables.AddAsync(table);
            await _rentVillaContext.SaveChangesAsync();
            var properties= await _rentVillaContext.PropertyTables.FindAsync(table.PropertyId);
            return properties;
        }

        public async Task<List<PropertyTable>> GetAllProperty()
        {
            var response = await _rentVillaContext.PropertyTables.Where(n => n.Status.Equals("yes")).ToListAsync();
            if (response == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[0]);
            }
            else
            {
                return response;
            }
            
        }

        public async Task<PropertyDetails> GetPropertyDetails(int propertyId)
        {
            var combinedData = from property in _rentVillaContext.PropertyTables
                               join user in _rentVillaContext.UserTables
                               on property.UserId equals user.UserId
                               join img in _rentVillaContext.ImageTables
                               on property.PropertyId equals img.PropertyId
                               where img.PropertyId == propertyId
                               select new PropertyDetails 
                               { 
                                    PropertyId= property.PropertyId,
                                    PropertyName=property.PropertyName,
                                    Address=property.Address,   
                                    City=property.City,
                                    Pincode=property.Pincode,
                                    Description=property.Description,
                                    RentAmount=property.RentAmount,
                                    NumberOfBhk=property.NumberOfBhk,
                                    NumberOfFloor=property.NumberOfFloor,
                                    Status=property.Status,
                                    PostedDate=property.PostedDate,
                                    FurnishedStatus=property.FurnishedStatus,
                                    UserId=user.UserId,
                                    UserName=user.UserName,
                                    Email=user.Email,
                                    Password=user.Password,
                                    Phone=user.Phone,
                                    UserRole=user.UserRole,
                                    Img1=img.Img1,
                                    Img2=img.Img2,
                                    Img3=img.Img3
                               };
            PropertyDetails propertyDetails = combinedData.FirstOrDefault();
            if (propertyDetails != null)
            {
                return propertyDetails;
            }
            else
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
                       
        }

        public async Task<string> RemoveProperty(int propertyId)
        {
            var property = await _rentVillaContext.PropertyTables.FindAsync(propertyId);
            if (property == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }

            var propertyimg = await _rentVillaContext.ImageTables.Where(n => n.PropertyId == propertyId).FirstOrDefaultAsync();
            var propertywish = await _rentVillaContext.WishlistTables.Where(n => n.PropertyId == propertyId).FirstOrDefaultAsync();
            _rentVillaContext.ImageTables.Remove(propertyimg);
            _rentVillaContext.WishlistTables.Remove(propertywish);
            _rentVillaContext.PropertyTables.Remove(property);
            await _rentVillaContext.SaveChangesAsync();
            return "true";



        }

        public async Task<List<PropertyTable>> Search(string? search)
        {
            var properties = await _rentVillaContext.PropertyTables.Where(n => n.City == search || n.PropertyName == search).ToListAsync();
            if (properties == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
            else
            {
                return properties;
            }
        }

        public async Task<PropertyTable> UpdatePropertyStatus(int propertyId)
        {
            var property = await _rentVillaContext.PropertyTables.FindAsync(propertyId);
            if (property == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
            else
            {
                if (property.Status.ToLower().Equals("yes")) 
                { 
                    property.Status = "no";
                }
                else 
                {
                    property.Status = "yes";
                }
                await _rentVillaContext.SaveChangesAsync();
                var user = await _rentVillaContext.PropertyTables.FindAsync(propertyId);
                return user;
            }


        }

        public async Task<string> UploadImages(IFormFile file, string imgType, int propertyId)
        { 
            try 
            { 
                if (file == null || file.Length == 0)
                { 
                    return null;
                } 
                else
                { 
                    var fileName = $"{imgType}_{propertyId}.png";
                    var filePath = Path.Combine("C:\\Users\\91786\\OneDrive\\Desktop\\Angular app\\Rent-villa-UI\\src\\assets\\house_images\\", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    } 
                    var rimage = await _rentVillaContext.ImageTables.FindAsync(propertyId); 
                    if (rimage != null)
                    {
                        rimage.PropertyId = propertyId;
                        if (imgType.ToLower().Equals("frontview"))
                        {
                            rimage.Img1 = fileName;
                        }
                        else if (imgType.ToLower().Equals("sideview")) 
                        { 
                            rimage.Img2 = fileName;
                        }
                        else 
                        {
                            rimage.Img3 = fileName;
                        } 
                        await _rentVillaContext.SaveChangesAsync();
                        return "yes"; 
                    } 
                    else
                    { 
                        ImageTable imageDetails = new ImageTable(); 
                        imageDetails.PropertyId = propertyId;
                        if (imgType.ToLower().Equals("frontview")) 
                        {
                            imageDetails.Img1 = fileName;
                            await _rentVillaContext.ImageTables.AddAsync(imageDetails);
                            await _rentVillaContext.SaveChangesAsync();
                            return "yes";
                        } 
                        else if (imgType.ToLower().Equals("sideview")) 
                        { 
                            imageDetails.Img2 = fileName;
                            await _rentVillaContext.ImageTables.AddAsync(imageDetails);
                            await _rentVillaContext.SaveChangesAsync(); return "yes";
                        } 
                        else 
                        {
                            imageDetails.Img3 = fileName; 
                            await _rentVillaContext.ImageTables.AddAsync(imageDetails); 
                            await _rentVillaContext.SaveChangesAsync(); return "yes";
                        }
                    }
                }
            }
            catch (Exception ex) 
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
        }
    }
}
