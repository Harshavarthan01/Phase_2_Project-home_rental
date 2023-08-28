using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RentVilla.Models;

public partial class UserTable
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public long Phone { get; set; }

    public string UserRole { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<PropertyTable> PropertyTables { get; set; } = new List<PropertyTable>();
    [JsonIgnore]
    public virtual ICollection<WishlistTable> WishlistTables { get; set; } = new List<WishlistTable>();
}
