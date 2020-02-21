using inventory.Config;
using NHibernate;
using System;
using System.Collections.Generic;

namespace inventory.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ISession Session = null;
        protected ITransaction Transaction = null;

        public RepositoryBase()
        {
            Session = Database.OpenSession();
        }

        public void BeginTransaction()
        {
            Transaction = Session.BeginTransaction();
        }

        public void CommitTransaction()
        {
            Transaction.Commit();
            CloseTransaction();
        }

        public void RollbackTransaction()
        {
            Transaction.Rollback();
            CloseTransaction();
            CloseSession();
        }

        private void CloseTransaction()
        {
            Transaction.Dispose();
            Transaction = null;
        }

        private void CloseSession()
        {
            Session.Close();
            Session.Dispose();
            Session = null;
        }

        public void Dispose()
        {
            if (Transaction != null)
            {
                CommitTransaction();
            }
            if (Session != null)
            {
                Session.Flush();
                CloseSession();
            }
        }

        public void Save(T entity)
        {
            BeginTransaction();

            try
            {
                Session.Save(entity);
                CommitTransaction();

            }
            catch (Exception ex)
            {
                if (!Transaction.WasCommitted)
                    RollbackTransaction();

                throw new Exception($"Error on save, {ex.Message}");
            }

        }

        public IList<T> RetrieveAll()
        {
            BeginTransaction();

            try
            {
                return Session.CreateCriteria<T>().List<T>();
            }
            catch (Exception ex)
            {
                if (!Transaction.WasCommitted)
                    RollbackTransaction();

                throw new Exception($"Error on retrieve data, {ex.Message}");
            }
        }

    }
}
