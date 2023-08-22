using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RentVilla.Models;

public partial class PropertyTable
{
    public int PropertyId { get; set; }

    public string PropertyName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public int Pincode { get; set; }

    public string Description { get; set; } = null!;

    public decimal RentAmount { get; set; }

    public int NumberOfBhk { get; set; }

    public int NumberOfFloor { get; set; }

    public string Status { get; set; } = null!;

    public DateTime PostedDate { get; set; }

    public string FurnishedStatus { get; set; } = null!;

    public int UserId { get; set; }

    [JsonIgnore]
    public virtual ICollection<ImageTable> ImageTables { get; set; } = new List<ImageTable>();

    [JsonIgnore]
    public virtual UserTable User { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<WishlistTable> WishlistTables { get; set; } = new List<WishlistTable>();
}
