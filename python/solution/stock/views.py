
from app.app import app, db_wrapper
from flask import Blueprint
from typing import List
from pathlib import Path
from flask import flash, request, redirect, url_for
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from stock.models import Product
from csv import DictReader
from io import StringIO
import peewee

stock_endpoints = Blueprint('stock', __name__, template_folder="templates")


@stock_endpoints.route('/')
def index():
    return redirect(url_for('admin.index'))


@stock_endpoints.route('/upload/', methods=['GET'])
def upload_view():
    return redirect(url_for('bulk_upload.index_view'))


@stock_endpoints.route('/upload/', methods=['POST'])
def upload_file():
    bulk_stock = BulkStock(request.files['the_file'])

    if not bulk_stock.is_valid_file():
        for error in bulk_stock.get_error_messages():
            flash(error, 'error')
        return redirect(request.url)

    # @TODO: Check if saving to file-system is really required
    # bulk_stock.save_file(app.config['UPLOAD_FOLDER'])
    # flash('File saved.', 'info')

    if not bulk_stock.update_stock_db(db_wrapper.database):
        for error in bulk_stock.get_error_messages():
            flash(error, 'error')
        return redirect(request.url)

    flash('Stock loaded! Go to Product tab to visualize.', 'info')
    return redirect(url_for('bulk_upload.index_view'))


class BulkStock:
    """A class to deal with bulk upload and download operations over stock
    products files."""

    __ALLOWED_EXTENSIONS = app.config['ALLOWED_EXTENSIONS']

    def __init__(self, file: FileStorage):
        """Initialize with the file to operate with"""
        self.file = file
        self.errors: List[str] = []
        self.safe_to_save = False

    def is_valid_file(self):
        """Checks if self.file and its filename are valid"""
        self.errors = []
        self.safe_to_save = False

        if self.file is None:
            self.errors = ['No file part']
            return False

        if self.file.filename is None or self.file.filename == '':
            self.errors = ['No selected file']
            return False

        self.filename = secure_filename(self.file.filename)
        if self.filename == '' or '.' not in self.filename:
            self.errors = ['Invalid filename']
            return False

        if not self.is_allowed_file(self.filename):
            self.errors = ['File type not allowed']
            return False

        self.safe_to_save = True
        return True

    def get_error_messages(self) -> List[str]:
        """Returns a list of all errors"""
        return self.errors

    def save_file(self, save_path):
        """Save the sel.file to system on save_path"""
        self.is_safe_to_save()
        self.file.save(Path(save_path).joinpath(self.filename))
        self.file.close()

    @classmethod
    def is_allowed_file(cls, filename):
        """Checks if a given filename have an acceptable extension"""
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in cls.__ALLOWED_EXTENSIONS

    def is_safe_to_save(self):
        """Raises an assertion error because this should be noticed on
        development time."""
        assert self.safe_to_save is True, \
            "Verify file with .is_valid_file() beforehand"
        return True

    def update_stock_db(self, db):
        """Update database stock with the stock uploaded."""
        self.is_safe_to_save()
        with db.atomic() as transaction:
            Product().truncate_table()

            try:
                reader = DictReader(StringIO(self.file.read().decode("utf-8")))
                for row in reader:
                    product = Product()

                    product.manufacturer = row['manufacturer']
                    product.model = row['model']
                    product.color = row['color']
                    product.carrier_plan_type = row['carrier_plan_type']
                    product.quantity = row['quantity']
                    product.price = row['price']

                    product.save()
            # except peewee.IntegrityError as e:
            except peewee.IntegrityError:
                # print(str(e))
                transaction.rollback()
                self.errors.append('Could not update the database.')
                self.errors.append('There is an error on given stock file!')
                return False
            except Exception:
                # @FIXME: Correctly catch database errors
                # http://docs.peewee-orm.com/en/latest/peewee/database.html
                transaction.rollback()
                self.errors.append('Could not update the database.')
                self.errors.append(
                    'The error is unknown, please contact support.')
                return False
        return True
