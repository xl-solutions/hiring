from flask import Flask

from inventory import configuration
from inventory import database
from inventory import commands

from inventory.routes.inventory_bp import inventory_bp


def create_app():
    app = Flask(__name__)

    """ Adicionando  inicializando os modulos no objeto App"""
    configuration.init_app(app)
    database.init_app(app)
    commands.init_app(app)

    """ Adicionando a rotas no app """
    app.register_blueprint(inventory_bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
