using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RentVilla.Models;

public partial class ImageTable
{
    public int ImageId { get; set; }

    public int? PropertyId { get; set; }

    public byte[] Images { get; set; } = null!;

    [JsonIgnore]
    public virtual PropertyTable? Property { get; set; }
}
