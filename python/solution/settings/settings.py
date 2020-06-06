
from os import getenv
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')


FLASK_ADMIN_SWATCH = 'flatly'

SECRET_KEY = getenv('SECRET_KEY')

DATABASE = getenv('DATABASE')

UPLOAD_FOLDER = 'var/uploads'

ALLOWED_EXTENSIONS = {'csv'}  # , 'txt' }


# def read_file():
#     import csv

#     with open('eggs.csv', newline='') as csvfile:
#         spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
#         for row in spamreader:
#             print(', '.join(row))

# class BaseConfig(object):
#     DEBUG = False
#     TESTING = False


# class DevelopmentConfig(BaseConfig):
#     DEBUG = True
#     TESTING = True


# class TestingConfig(BaseConfig):
#     DEBUG = False
#     TESTING = True
