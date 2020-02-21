using inventory.Models;

namespace inventoryTests.Fakes.Models
{
    public static class SmartphoneModelFake
    {
        public static SmartphoneModel GetInitialized()
        {
            return new SmartphoneModel();
        }

        public static SmartphoneModel GetFilled()
        {
            var Smartphone = GetInitialized();
            Smartphone.manufacturer = "Apple";
            Smartphone.model = "iPhone XR";
            Smartphone.color = "Red";
            Smartphone.carrier_plan_type = "pos";
            Smartphone.quantity = 20;
            Smartphone.price = 659;

            return Smartphone;
        }
    }
}
