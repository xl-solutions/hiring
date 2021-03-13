using System;
using System.Collections.Generic;
using System.Linq;
using XLSolutions.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;

namespace XLSolutions.Data
{
    public class SqlXLSolutionsData : ISqlXLSolutionsData
    {
        private PasswordHasher passwordhash { get; set; }
        private readonly XLSolutionsDbContext db;
        private readonly IPasswordHasher hashpass;

        public SqlXLSolutionsData(XLSolutionsDbContext db)
        {
            this.db = db;
            hashpass = new PasswordHasher(Options.Create<HashingOptions>(new HashingOptions()));
        }

        /*########################################################################################
        ---------------------------Client Section---------------------------
        ########################################################################################*/

        //Client Subscription Logic
        public bool SigninNewClient(string name, string new_usrId, string new_password)
        {
            Client client = new Client();
            string hash;
            if (new_password != String.Empty && new_password != null)
                hash = hashpass.Hash(new_password);
            else
                return false;

            if (name != String.Empty && new_usrId != String.Empty)
            {
                client.Name = name;
                client.UserId = new_usrId;
                client.Password = hash;
                client.ID = db.Client.Max(c => c.ID) + 1;
            }
            else
                return false;

            db.Client.Add(client);
            return true;
        }

        public bool Addclientname(string name) 
        {
            return name != null ? true : false;            

        }
        //public int TestingTest(int five) 
        //{
        //    return five;
        //}
        public bool SigninNewClient(Client client)
        {
            string hash;
            if (client.Password != String.Empty && client.UserId != null)
                hash = hashpass.Hash(client.Password);
            else
                return false;

            if (CheckHashOutPut(client.Password, hash) == 0)
                return false;

            if (client.Name != String.Empty && client.UserId != String.Empty)
            {
                client.Name = client.Name;
                client.UserId = client.UserId;
                client.Password = hash;
                client.ID = db.Client.Max(c => c.ID) + 1;
            }
            else
                return false;

            db.Client.Add(client);
            return true;
        }

        //-------------------------------------------------------------------------------------
        //---------------------------SigninNewClient Assist Method-----------------------------
        private int CheckHashOutPut(string new_password, string hash)
        {
            int i = 1;
            while (i != 100)
            {
                if (hashpass.Check(hash, new_password) == (true, false))
                    break;
                else
                    i++;
            }
            if (i != 100)
                return 1;
            else
                return 0;
        }
        //---------------------------SigninNewClient Assist Method-----------------------------
        //-------------------------------------------------------------------------------------

        public Client LogInClient(string usrId, string password)
        {
            Client client = db.Client.Where(x => !string.IsNullOrEmpty(x.UserId) &&
                                            x.UserId.CompareTo(usrId) == 0).SingleOrDefault();

            if (client == null)
                return null;

            if (hashpass.Check(client.Password, password) == (true, false))
                return client;
            else
                return null;
        }

        //???????????????????????????????????????
        public IEnumerable<Client> GetClientByName(string name)
        {
            return db.Client.Where(x => !string.IsNullOrEmpty(x.UserId) &&
                                            x.UserId.CompareTo(name) == 0);
        }

        //Find and fetch the designated Client from the database based on their propriatery Identification Number (ID)
        public Client GetClientById(int ID)
        {
            return db.Client.Where(x => x.ID != 0 && x.ID == ID).SingleOrDefault();
        }

        //Find and remove the designated Client from the database based on their propriatery Identification Number (ID)
        public Client DeleteClient(int ID)
        {
            Client client = GetClientById(ID);
            if (client != null)
            {
                db.Client.Remove(client);
            }
            return client;
        }
        /*########################################################################################
        ---------------------------Phone Section---------------------------
        ########################################################################################*/

        //Find and fetch the designated Phone from the database based on its propriatery Identification Number (ID)
        public Phone GetPhoneById(int ID)
        {
            return db.Phone.Find(ID);
        }

        //???????????????????????????????????????????????????
        public Phone UpdatePhone(Phone updatedPhone)
        {
            EntityEntry entity = db.Phone.Attach(updatedPhone);
            entity.State = EntityState.Modified;
            return updatedPhone;
        }

        //Add a new Phone into the database and automatically assign it to a new ID number
        //based off of the highest ID from the last added Phone in the query by making it the latest,
        //thus its ID becoming the highest.
        public Phone AddPhone(Phone newPhone)
        {
            db.Phone.Add(newPhone);
            newPhone.ID = db.Phone.Max(p => p.ID) + 1;
            return newPhone;
        }

        //Look up for a Phone inside the database by its ID number and then remove it from there 
        public Phone DeletePhone(int id)
        {
            Phone phone = GetPhoneById(id);
            if (phone != null)
            {
                db.Phone.Remove(phone);
            }
            return phone;
        }

        public int GetCountOfAllPhones()
        {
            return db.Phone.Count();
        }

        public IEnumerable<Phone> GetPhoneByBrand(string brand)
        {
            var query = from p in db.Phone
                        where string.IsNullOrEmpty(brand) || p.Brand.ToString().StartsWith(brand)
                        orderby p.Brand
                        select p;
            return query;
        }
        public IEnumerable<Phone> GetAllPhones()
        {
            return db.Phone.AsEnumerable();
        }

        /*########################################################################################
        ---------------------------Commit All---------------------------
        ########################################################################################*/
        public int Commit()
        {
            return 0;
        }
    }
}
