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

        public async Task<List<PropertyTable>> AddProperty(PropertyTable table)
        {
            await _rentVillaContext.PropertyTables.AddAsync(table);
            await _rentVillaContext.SaveChangesAsync();
            var properties= await _rentVillaContext.PropertyTables.ToListAsync();
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
                                    UserRole=user.UserRole
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

        public async Task<List<PropertyTable>> RemoveProperty(int propertyId)
        {
            var property = await _rentVillaContext.PropertyTables.FindAsync(propertyId);
            if (property == null)
            {
                throw new Exception(RentVillaException.RentVillaExceptions[1]);
            }
            else
            {
                _rentVillaContext.PropertyTables.Remove(property);
               await  _rentVillaContext.SaveChangesAsync();
                var response = await _rentVillaContext.PropertyTables.ToListAsync();
                return response;

            }
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
    }
}
