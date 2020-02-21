using inventory.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace inventoryTests.Fakes
{
    public static class FileFake
    {
        public static IFormFile GetEmptyFile()
        {
            return new FormFile(new MemoryStream(Encoding.UTF8.GetBytes("")), 0, 0, "CsvFile", "input_empty.csv");
        }

        public static IFormFile GetValidFile()
        {
            var file = File.ReadLines("../../../Fakes/input_valid.csv").ToString().ToCharArray();
            return new FormFile(new MemoryStream(Encoding.UTF8.GetBytes(file)), 0, 0, "CsvFile", "input_valid.csv");
        }

        public static IFormFile GetInvalidFile()
        {
            var file = File.ReadLines("../../../Fakes/input_valid.csv").ToString();
            return new FormFile(new MemoryStream(Encoding.UTF8.GetBytes(file)), 0, 0, "CsvFile", "input_valid.csv");
        }

        public static List<SmartphoneModel> GetValidList()
        {
            var list = new List<SmartphoneModel>();

            list.Add(new SmartphoneModel
            {
                manufacturer = "Motorola",
                model = "Moto G5 16GB",
                color = "Preto",
                carrier_plan_type = "pre",
                quantity = 20,
                price = 1299
            });

            return list;
        }

        public static List<SmartphoneModel> GetInvalidList()
        {
            var list = new List<SmartphoneModel>();

            list.Add(new SmartphoneModel
            {
                manufacturer = "Motorola",
                model = "Moto G5 16GB",
            });

            return list;
        }
    }
}
