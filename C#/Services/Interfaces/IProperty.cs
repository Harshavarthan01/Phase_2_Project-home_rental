using RentVilla.Models;

namespace RentVilla.Services.Interfaces
{
    public interface IProperty
    {
        Task<List<PropertyTable>> GetAllProperty();

        Task<List<PropertyTable>> AddProperty(PropertyTable table);

        Task<List<PropertyTable>> RemoveProperty(int propertyId);

        Task<PropertyTable> UpdatePropertyStatus(int propertyId);

        Task<PropertyDetails> GetPropertyDetails(int propertyId);

        Task<List<PropertyTable>> Search(string? search);

        
    }
}
