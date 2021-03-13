namespace XLSolutions.Core
{
    public interface IPhone
    {
        PhoneBrand Brand { get; set; }
        int ID { get; set; }
        string Model { get; set; }
        double Price { get; set; }
        string SubType { get; set; }
        string Type { get; set; }
    }
}