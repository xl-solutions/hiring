using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Globalization;
using XLSolutions.Core;
using XLSolutions.Data;

namespace XLSolutions.Pages.Store
{
    public class DetailModel : PageModel
    {
        private readonly IPhoneData phoneData;
        public Phone Phone { get; set; }

        public DetailModel(IPhoneData phoneData)
        {
            this.phoneData = phoneData;
        }

        public NumberFormatInfo GetNumberFormat()
        {
            return new CultureInfo("en-US", false).NumberFormat;
        }

        public IActionResult OnGet(int phoneId)
        {
            Phone = phoneData.GetPhoneById(phoneId);
            if (Phone == null)
            {
                return RedirectToPage("./NotFound");
            }
            return Page();
        }
    }
}
