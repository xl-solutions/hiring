using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using XLSolutions.Core;
using XLSolutions.Data;

namespace XLSolutions.Pages.Admin
{
    public class ManagerModel : PageModel
    {
        private readonly IPhoneData phoneData;
        public IEnumerable<Phone> Phones;
        public ManagerModel(IPhoneData phoneData)
        {
            this.phoneData = phoneData;
        }
        public NumberFormatInfo GetNumberFormat()
        {
            return new CultureInfo("en-US", false).NumberFormat;
        }

        public void OnGet()
        {
            
        }
    }
}
