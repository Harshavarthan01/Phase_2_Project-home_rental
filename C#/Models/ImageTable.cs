using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RentVilla.Models;

public partial class ImageTable
{
    public int ImageId { get; set; }

    public int? PropertyId { get; set; }

    public string? Img1 { get; set; }

    public string? Img2 { get; set; }

    public string? Img3 { get; set; }

    [JsonIgnore]
    public virtual PropertyTable? Property { get; set; }
}
