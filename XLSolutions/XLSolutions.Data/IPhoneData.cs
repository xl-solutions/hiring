using System.Collections.Generic;
using XLSolutions.Core;

namespace XLSolutions.Data
{
    public interface IPhoneData
    {
        IEnumerable<Phone> GetPhoneByBrand(string brand);
        IEnumerable<Phone> GetAllPhones();
        Phone GetPhoneById(int ID);
        Phone UpdatePhone(Phone updatedPhone);
        Phone AddPhone(Phone newPhone);
        Phone DeletePhone(int id);
        int GetCountOfAllPhones();
    }
}
