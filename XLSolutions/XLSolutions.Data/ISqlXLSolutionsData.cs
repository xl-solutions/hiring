using System.Collections.Generic;
using XLSolutions.Core;

namespace XLSolutions.Data
{
    public interface ISqlXLSolutionsData : IPhoneData, IClientData
    {
        bool Addclientname(string name);
        int Commit();
        //int TestingTest(int five);
    }
}