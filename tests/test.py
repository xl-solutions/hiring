import unittest
from utils import format_json
from db_management import valid_database


class TestGeral(unittest.TestCase):

    def test_json(self):
        self.assertEqual(format_json(None), [])

    def test_database(self):
        self.assertTrue(valid_database())

if __name__ == '__main__':
    unittest.main()