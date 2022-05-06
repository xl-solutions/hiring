from app.database import db


def init_app(app):
    
    @app.cli.command('create_db', help="Create database.")
    def create_db():
        """ Create database """
        db.create_all()

    @app.cli.command('drop_db', help="Drop database.")
    def drop_db():
        """ Drop database"""
        db.drop_all()
    