using System.Collections.Generic;

namespace inventory.Repository
{
    public interface IRepositoryBase<T> where T : class
    {
        void BeginTransaction();
        void CommitTransaction();
        void Dispose();
        IList<T> RetrieveAll();
        void RollbackTransaction();
        void Save(T entity);
        IList<T> SearchSmartphone(string data);
    }
}