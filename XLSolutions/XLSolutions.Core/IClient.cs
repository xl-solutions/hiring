namespace XLSolutions.Core
{
    public interface IClient
    {
        int ID { get; set; }
        string Name { get; set; }
        string Password { get; set; }
        string UserId { get; set; }
    }
}