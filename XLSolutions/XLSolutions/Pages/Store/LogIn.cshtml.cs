using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using XLSolutions.Core;
using XLSolutions.Data;

namespace XLSolutions.Pages.Store
{
    public class LogInModel : PageModel
    {
        private readonly IClientData clientData;
        public Client client { get; set; }
        [BindProperty]
        public string UserTextline { get; set; }
        [BindProperty]
        public string PwdTextline { get; set; } = "FakePSW";
        [TempData]
        public string TempMessage { get; set; }

        public bool ClientLoggedIn { get; private set; }
        public LogInModel(IClientData clientData)
        {
            this.clientData = clientData;
        }

        public void OnPost()
        {
            
        }

        public IActionResult LogIn()
        {
            client = clientData.LogInClient(UserTextline, PwdTextline);

            ClientLoggedIn = client != default(Client);

            if (ClientLoggedIn == false)
                return RedirectToPage("./NotFound");
            else
                return Page();
        }
    }
}
