using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using RentVilla.Models;
using RentVilla.Services.Interfaces;

namespace RentVilla.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        public Services.Interfaces.IProperty _properties;

        public PropertyController(Services.Interfaces.IProperty property)
        {
            _properties = property;
        }

        [HttpGet("GetAllProperties")]
        public async Task<ActionResult<List<PropertyTable>>> GetAllProperty() {
            try
            {
                var properties = await _properties.GetAllProperty();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }
        [HttpPost("AddProperty")]
        public async Task<ActionResult<List<PropertyTable>>> AddProperty(PropertyTable propertyTable) 
        {
            var properties = await _properties.AddProperty(propertyTable);
            return Ok(properties);
            
        }

        [HttpDelete("RemoveProperty")]
        public async Task<ActionResult<List<PropertyTable>>> RemoveProperty(int propertyId)
        {
            try
            {
                var response= await _properties.RemoveProperty(propertyId);
                return Ok(response);
            }catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut("UpdatePropertyStatus")]
        public async Task<ActionResult<List<PropertyTable>>> UpdatePropertyStatus(int propertyId) 
        {
            try 
            { 
                var user = await _properties.UpdatePropertyStatus(propertyId);
                return Ok(user);
            }catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("Search")]
        public async Task<ActionResult<List<PropertyTable>>> Search(string? search)
        {
            try
            { 
                var properties= await _properties.Search(search);
                return Ok(properties);
            } catch (Exception ex)
            {
                return NotFound(ex.Message);
            }       
        
        }
        [HttpGet("PropertyDetails")]
        public async Task<ActionResult<PropertyDetails>> GetPropertyDetails(int propertyId)
        {
            try
            {
                var propertyinfo = await _properties.GetPropertyDetails(propertyId);
                return Ok(propertyinfo);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message) ;
            }
        }
       
    }
}
