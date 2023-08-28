using RentVilla.Models;

namespace RentVilla.Services.Interfaces
{
    public interface IProperty
    {
        Task<List<PropertyTable>> GetAllProperty();

        Task<PropertyTable> AddProperty(PropertyTable table);

        Task<string> RemoveProperty(int propertyId);

        Task<PropertyTable> UpdatePropertyStatus(int propertyId);

        Task<PropertyDetails> GetPropertyDetails(int propertyId);

        Task<List<PropertyTable>> Search(string? search);

        Task<string> UploadImages(IFormFile file, string imgType, int propertyId);
    }
}
