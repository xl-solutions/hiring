
from os import getenv
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')


FLASK_ADMIN_SWATCH = 'flatly'

SECRET_KEY = getenv('SECRET_KEY')

DATABASE = getenv('DATABASE')

UPLOAD_FOLDER = 'var/uploads'

ALLOWED_EXTENSIONS = {'csv'}  # , 'txt' }
