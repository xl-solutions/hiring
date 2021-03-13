using System.ComponentModel.DataAnnotations;

namespace XLSolutions.Core
{
    public class Client : IClient
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public int ID { get; set; }
    }
}
