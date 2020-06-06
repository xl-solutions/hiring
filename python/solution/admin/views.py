
from flask_admin import BaseView, expose


class BulkUploadView(BaseView):
    @expose('/')
    def index_view(self):
        return self.render('admin/bulk_upload_index.html')
