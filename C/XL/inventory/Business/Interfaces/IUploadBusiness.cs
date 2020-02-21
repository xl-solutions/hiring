using System.Collections.Generic;
using inventory.Models;
using Microsoft.AspNetCore.Http;

namespace inventory.Business
{
    public interface IUploadBusiness
    {
        List<SmartphoneModel> ParseCsvSmartphone(IFormFile csvFile);
    }
}