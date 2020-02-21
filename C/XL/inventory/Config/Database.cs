using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using inventory.Models;
using NHibernate;

namespace inventory.Config
{
    public class Database
    {
        private const string ConnectionString = @"Server=inventory.cgtenornhiji.sa-east-1.rds.amazonaws.com; Port=3306; User Id=root; Password=12345678; Database=inventorydb";
        private static ISessionFactory _sessionFactory;

        private static ISessionFactory SessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                {
                    IPersistenceConfigurer configDB = MySQLConfiguration.Standard.ConnectionString(ConnectionString);
                    var configMap = Fluently.Configure().Database(configDB).Mappings(c => c.FluentMappings.AddFromAssemblyOf<SmartphoneModel>());
                    _sessionFactory = configMap.BuildSessionFactory();
                }
                return _sessionFactory;
            }
        }

        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }

    }
}
