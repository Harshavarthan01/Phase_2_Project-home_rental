using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RentVilla.Models;

public partial class WishlistTable
{
    
    public int WishlistId { get; set; }

    public int? PropertyId { get; set; }

    public int? UserId { get; set; }
    [JsonIgnore]
    public virtual PropertyTable? Property { get; set; }
    [JsonIgnore]
    public virtual UserTable? User { get; set; }
}
