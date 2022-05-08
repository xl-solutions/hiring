from flask import Flask

from . import configuration
from . import database
from . import commands

from app.routes.inventory_bp import inventory_bp

def create_app():
    app = Flask(__name__)

    """ Adicionando  inicializando os modulos no objeto App"""
    configuration.init_app(app)
    database.init_app(app)
    commands.init_app(app)
    

    """ Adicionando a rotas no app """
    app.register_blueprint(inventory_bp)

    return app