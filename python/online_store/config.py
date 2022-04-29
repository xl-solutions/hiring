# -*- coding: utf-8 -*-
import os

class Config(object):
    """
    Default configuration 
    """
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    WTF_CSRF_ENABLED = True,
    SECRET_KEY = '57e19ea558d4967a552d03deece34a70'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'static/files'
    ALLOWED_EXTENSIONS = {'csv','txt'}


class ProductionConfig(Config):
    """
    Configuration for production environment
    """
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = "postgressql+psycopg2:// \
                                {user}:{password}@{host}:{port}/{db}".format(
                                    user=os.environ.get('POSTGRES_USER'),
                                    password=os.environ.get('POSTGRES_PASSWORD'),
                                    host=os.environ.get('POSTGRES_HOST'),
                                    port=os.environ.get('POSTGRES_PORT'),
                                    db=os.environ.get('POSTGRES_DB') 
                                )
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class DevelopmentConfig(Config):
    """
    Configuration for develop environmnet
    """
    ENV="development"
    DEVELOPMENT=True
    DEBUG=True
    SQLALCHEMY_DATABASE_URI="sqlite:///development.db"
