using System;
using System.Collections.Generic;
using System.Linq;
using XLSolutions.Core;

namespace XLSolutions.Data
{
    public class InMemoryData : IPhoneData
    {
        readonly List<Phone> phonelst;

        public InMemoryData()
        {
            phonelst = new List<Phone>() 
            {
                new Phone(){Brand = PhoneBrand.Apple, Model="iPhone", Type="X", Price=5200.99, ID=1},
                new Phone(){Brand = PhoneBrand.Apple, Model="iPhone", Type="8", Price=1200.99, ID=2},
                new Phone(){Brand = PhoneBrand.Motorola, Model="Moto", Type="G", Price=1450.00, ID=3}
            };
        }

        public Phone AddPhone(Phone newPhone)
        {
            throw new NotImplementedException();
        }

        public int Commit()
        {
            throw new NotImplementedException();
        }

        public Phone DeletePhone(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Phone> GetAllPhones()
        {
            return from p in phonelst
                   orderby p.Brand
                   select p;
        }

        public int GetCountOfAllPhones()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Phone> GetPhoneByBrand(string brand)
        {
            throw new NotImplementedException();
        }

        public Phone GetPhoneById(int ID)
        {
            return phonelst.SingleOrDefault(p => p.ID == ID);
        }

        public Phone UpdatePhone(Phone updatedPhone)
        {
            throw new NotImplementedException();
        }
    }
}
