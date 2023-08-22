namespace RentVilla.GlobalException
{
    public class RentVillaException : Exception
    {
        public RentVillaException(string? message) : base(message)
        {
        }

        public static List<string> RentVillaExceptions = new List<string>
        {
            "Property Not Found",
            ""
        };
    }
}
