using FluentNHibernate.Mapping;
using inventory.Models;

namespace inventory.Repository
{
    public class SmartphoneRepository : ClassMap<SmartphoneModel>
    {
        public SmartphoneRepository()
        {
            Id(m => m._id, "_id");
            Map(m => m.manufacturer, "manufacturer");
            Map(m => m.model, "model");
            Map(m => m.color, "color");
            Map(m => m.carrier_plan_type, "carrier_plan_type");
            Map(m => m.quantity, "quantity");
            Map(m => m.price, "price");
            Table("smartphones");

        }
    }
}
