using FluentAssertions;
using inventory.Business;
using System;
using inventoryTests.Fakes;
using NSubstitute;
using NUnit.Framework;

namespace inventoryTests.Business
{
    [TestFixture]
    public class ParseBusinessTest
    {
        public const string ERROR_MESSAGE_EMPTY_FILE = "Empty file.";

        private IUploadBusiness UploadBusiness;

        [SetUp]
        public void SetUp()
        {
            UploadBusiness = Substitute.For<IUploadBusiness>();
            UploadBusiness = new UploadBusiness();
        }


        [TestCase(TestName = "[inventory] Should be parse csv file correcty")]
        public void Should_be_parse_csv_file_correcty()
        {
            var validFile = FileFake.GetValidFile();
            var obtained = UploadBusiness.ParseCsvSmartphone(validFile);
            obtained.Should().BeEquivalentTo(FileFake.GetValidList());
        }

        [TestCase(TestName = "[inventory] Should be return error message for empty file")]
        public void Should_be_return_error_message_for_empty_file()
        {
            var emptyFile = FileFake.GetEmptyFile();
            var exception = Assert.Throws<Exception>(() => UploadBusiness.ParseCsvSmartphone(emptyFile));
            exception.Message.Should().BeEquivalentTo(ERROR_MESSAGE_EMPTY_FILE);
        }
    }
}
