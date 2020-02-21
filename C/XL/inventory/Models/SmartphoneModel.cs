using System;

namespace inventory.Models
{
    public class SmartphoneModel
    {
        public virtual Guid _id { get; set; }
        public virtual string manufacturer { get; set; }
        public virtual string model { get; set; }
        public virtual string color { get; set; }
        public virtual string carrier_plan_type { get; set; }
        public virtual int quantity { get; set; }
        public virtual long price { get; set; }
    }
}
