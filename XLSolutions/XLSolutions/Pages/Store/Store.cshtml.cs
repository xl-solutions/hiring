using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using XLSolutions.Core;
using XLSolutions.Data;

namespace XLSolutions.Pages.Store
{
    public class StoreModel : PageModel
    {
        private readonly IPhoneData phoneData;
        private readonly IClientData clientData;
        public IEnumerable<Phone> Phones { get; set; }
        public IEnumerable<Client> Clients { get; set; }
        public StoreModel(IPhoneData phoneData, IClientData clientData)
        { 
            this.phoneData = phoneData;
            this.clientData = clientData;
        }
        public NumberFormatInfo GetNumberFormat() 
        {
            return new CultureInfo("en-US", false).NumberFormat;
        }

        public void OnPost()
        {           
              
        }
    }
}
