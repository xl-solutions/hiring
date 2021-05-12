from .main import main

def init_app(app):
    app.register_blueprint(main)