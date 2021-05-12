from flask import Flask 
from app import config

def create_app():
    app = Flask(__name__)
    config.init_app(app)

    return app
