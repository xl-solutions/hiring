using System;
using System.Collections.Generic;
using System.Text;
using XLSolutions.Core;

namespace XLSolutions.Data
{
    public interface IClientData
    {
        IEnumerable<Client> GetClientByName(string name);
        bool SigninNewClient(string name, string new_usrID, string new_password);
        Client LogInClient(string usrId, string password);
        Client GetClientById(int ID);
        Client DeleteClient(int ID);
    }
}
