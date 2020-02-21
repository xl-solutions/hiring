using inventory.Business;
using inventory.Models;
using inventory.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace inventory.Controllers
{
    public class UploadController : Controller
    {
        private readonly IUploadBusiness UploadBusiness;
        private readonly IRepositoryBase<SmartphoneModel> SmartphoneRepository;

        public UploadController(IUploadBusiness UploadBusiness, IRepositoryBase<SmartphoneModel> SmartphoneRepository)
        {
            this.UploadBusiness = UploadBusiness;
            this.SmartphoneRepository = SmartphoneRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View(new UploadModel());
        }

        [HttpPost]
        public IActionResult FileUpload(UploadModel uploadedFile)
        {
            try
            {
                List<SmartphoneModel> parsedList = UploadBusiness.ParseCsvSmartphone(uploadedFile.CsvFile);

                if (parsedList == null)
                    return null;

                foreach (var item in parsedList)
                {
                    SmartphoneRepository.Save(item);
                }

                TempData["success"] = "File imported with success";
                return Redirect("/Home");
            }
            catch (Exception err)
            {
                var message = err.Message.Split('.');
                TempData["error"] = message[0];
                return Redirect("/Home");
            }
        }
    }
}
