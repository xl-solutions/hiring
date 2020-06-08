
from app.app import app, db_wrapper
from stock import views, models
from admin.endpoints import admin

db_wrapper.init_app(app)
admin.init_app(app)
app.register_blueprint(views.stock_endpoints)

# pipenv run flask run


def create_db(db):
    with db:
        db.create_tables([models.Product, ])


if __name__ == "__main__":
    create_db(db_wrapper.database)
