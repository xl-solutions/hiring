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

        public IActionResult Index(IList<SmartphoneModel> smartphones)
        {
            return View(smartphones);
        }

        [HttpGet]
        public IActionResult Search ([FromQuery]string data)
        {
            if (string.IsNullOrEmpty(data))
                return null;
            
           return RedirectToAction("Index", "Home", SmartphoneRepository.RetrieveAll());
        }
    }
}
