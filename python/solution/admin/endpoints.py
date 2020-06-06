
from flask_admin import Admin
from flask_admin.contrib.peewee import ModelView
from admin.views import BulkUploadView
from stock.models import Product

admin = Admin(name='Stock Admin', template_mode='bootstrap3')
admin.add_view(ModelView(Product))
admin.add_view(
    BulkUploadView(name='Bulk Upload', endpoint='bulk_upload'))
