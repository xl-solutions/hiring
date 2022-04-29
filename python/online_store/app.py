# -*- coding: utf-8 -*-
import os

from flask import Flask
from database import database
from flask_wtf import CSRFProtect

from flask_bootstrap import Bootstrap
from apps.product.views import product

def create_app():
    app = Flask(__name__)
    CSRFProtect(app)
    Bootstrap(app)
    # setup with the configuration provided
    if os.environ.get('FLASK_ENV') == 'production':
        app.config.from_object('config.ProductionConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')
    # app.config.from_object('config.DevelopmentConfig')
    
    # setup all our dependencies
    database.init_app(app)
    
    # register blueprint
    # app.register_blueprint(home)
    app.register_blueprint(product, url_prefix="/product")
    
    return app

if __name__ == "__main__":
    create_app().run()