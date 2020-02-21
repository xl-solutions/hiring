using Microsoft.AspNetCore.Http;

namespace inventory.Models
{
    public class UploadModel
    {
        public virtual IFormFile CsvFile { get; set; }
    }
}
