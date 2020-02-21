using CsvHelper;
using inventory.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace inventory.Business
{
    public class UploadBusiness : IUploadBusiness
    {
        public List<SmartphoneModel> ParseCsvSmartphone(IFormFile csvFile)
        {
            try
            {
                var reader = new StreamReader(csvFile.OpenReadStream());
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    var smartphones = new List<SmartphoneModel>();
                    csv.Read();
                    csv.ReadHeader();                    
                    while (csv.Read())
                    {
                        var smartphone = new SmartphoneModel
                        {
                            _id = new Guid(),
                            manufacturer = csv.GetField<string>("manufacturer"),
                            model = csv.GetField<string>("model"),
                            color = csv.GetField<string>("color"),
                            carrier_plan_type = csv.GetField<string>("carrier_plan_type"),
                            price = csv.GetField<long>("price"),
                            quantity = csv.GetField<int>("quantity")                            
                        };
                        smartphones.Add(smartphone);
                    }
                    return smartphones;
                }            
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }
    }
}
