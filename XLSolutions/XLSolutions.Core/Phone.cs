using System.ComponentModel.DataAnnotations;

namespace XLSolutions.Core
{
    public class Phone : IPhone
    {
        [Required]
        public PhoneBrand Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Type { get; set; }
        public string SubType { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int ID { get; set; }

    }
}
