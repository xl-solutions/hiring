
import pytest
from pathlib import Path
from werkzeug.datastructures import FileStorage
from stock.views import BulkStock

VALID_FILENAME = 'var/file.csv'
INVALID_FILENAME = 'var/.  .csv'
VALID_STOCK_FILE = 'var/input_valid.csv'
INVALID_STOCK_FILE = 'var/input_invalid.csv'


class TestBulkStock:

    def test_is_valid_file_with_valid_filename(self):
        self.bulk_stock = BulkStock(self.get_file_stream(VALID_FILENAME))
        assert self.bulk_stock.is_valid_file() is True
        assert self.bulk_stock.get_error_messages() == []

    def test_is_valid_file_with_invalid_filename(self):
        self.bulk_stock = BulkStock(self.get_file_stream(INVALID_FILENAME))
        assert self.bulk_stock.is_valid_file() is False
        assert self.bulk_stock.get_error_messages() == ['Invalid filename']

    def test_is_valid_file_without_file_storage(self):
        self.bulk_stock = BulkStock(None)
        assert self.bulk_stock.is_valid_file() is False
        assert self.bulk_stock.get_error_messages() == ['No file part']

    def test_is_valid_file_with_valid_stock_file(self):
        self.bulk_stock = BulkStock(self.get_file_stream(VALID_STOCK_FILE))
        assert self.bulk_stock.is_valid_file() is True
        assert self.bulk_stock.get_error_messages() == []

    def test_is_valid_file_with_invalid_stock_file(self):
        self.bulk_stock = BulkStock(self.get_file_stream(INVALID_STOCK_FILE))
        assert self.bulk_stock.is_valid_file() is True
        assert self.bulk_stock.get_error_messages() == []

    def test_save_file_with_valid_filename(self):
        self.test_is_valid_file_with_valid_stock_file()
        assert self.bulk_stock.is_safe_to_save() is True
        self.bulk_stock.save_file('var/tmp/')

    def test_save_file_with_invalid_filename(self):
        self.test_is_valid_file_with_invalid_filename()
        with pytest.raises(AssertionError):
            self.bulk_stock.is_safe_to_save()
            self.bulk_stock.save_file('var/tmp/')

    def test_save_file_with_invalid_stock_file(self):
        self.test_is_valid_file_with_invalid_stock_file()
        assert self.bulk_stock.is_safe_to_save() is True
        self.bulk_stock.save_file('var/tmp/')

    @classmethod
    def get_file_stream(cls, filename):
        file: FileStorage = None
        file_stream = open(filename, 'rb')
        file = FileStorage(file_stream)
        file.filename = Path(file.filename).parts[-1]
        return file
