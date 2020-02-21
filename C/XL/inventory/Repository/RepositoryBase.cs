using inventory.Config;
using NHibernate;
using NHibernate.Criterion;
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

        public IList<T> SearchSmartphone(string data)
        {
            BeginTransaction();

            try
            {
                var manufacturer = Restrictions.Like("manufacturer", data, MatchMode.Anywhere);
                var model = Restrictions.Like("model", data, MatchMode.Anywhere);
                var carrier = Restrictions.Like("carrier_plan_type", data, MatchMode.Anywhere);

                Disjunction disjunction = Restrictions.Disjunction();
                disjunction.Add(manufacturer);
                disjunction.Add(model);
                disjunction.Add(carrier);

                return Session.CreateCriteria<T>().Add(disjunction).List<T>();

            }
            catch (Exception err)
            {
                if (!Transaction.WasCommitted)
                    RollbackTransaction();

                throw new Exception($"Error searching data, {err.Message}");
            }
        }

    }
}
