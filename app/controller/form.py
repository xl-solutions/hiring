from flask_wtf import FlaskForm
from flask_wtf.file import FileField


class UploadFile(FlaskForm):
    upload_csv = FileField('upload_csv')