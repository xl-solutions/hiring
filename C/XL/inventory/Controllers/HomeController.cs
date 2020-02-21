using System.Collections.Generic;
using inventory.Models;
using inventory.Repository;
using Microsoft.AspNetCore.Mvc;

namespace inventory.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRepositoryBase<SmartphoneModel> SmartphoneRepository;

        public HomeController(IRepositoryBase<SmartphoneModel> SmartphoneRepository)
        {
            this.SmartphoneRepository = SmartphoneRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View(SmartphoneRepository.RetrieveAll());
        }

        [HttpPost]
        public IActionResult Index(string data)
        {
            if (string.IsNullOrEmpty(data))
                return View(SmartphoneRepository.RetrieveAll());

            var result = SmartphoneRepository.SearchSmartphone(data);
            return View(result);
        }
    }
}
