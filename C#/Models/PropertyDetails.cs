namespace RentVilla.Models
{
    public class PropertyDetails
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

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public long Phone { get; set; }

        public string UserRole { get; set; } = null!;

        public string? Img1 { get; set; }

        public string? Img2 { get; set; }

        public string? Img3 { get; set; }
    }
}
