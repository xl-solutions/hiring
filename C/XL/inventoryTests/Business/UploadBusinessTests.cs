using inventory.Business;
using inventory.Models;
using inventoryTests.Fakes.Models;
using NSubstitute;
using NUnit.Framework;

namespace inventoryTests.Business
{
    [TestFixture]
    public class UploadBusinessTests
    {
        private IUploadBusiness UploadBusiness;
        private SmartphoneModel Smartphone;

        [SetUp]
        public void SetUp()
        {
            Smartphone = SmartphoneModelFake.GetFilled();
            UploadBusiness = Substitute.For<IUploadBusiness>();
            UploadBusiness = new UploadBusiness();
        }

        [TestCase(TestName = "[inventory] Should be parse csv file correctly")]
        public void Should_be_parse_csv_file_correctly()
        {
            
        }
    }
}
