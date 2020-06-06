
# @FIXME: At this point, flake8 will be crazy: importing lazyloaded views
from app.app import app, db
from stock import views
from admin.endpoints import admin
from stock.models import Product

admin.init_app(app)

# pipenv run flask run


def create_db():
    with db:
        db.create_tables([Product, ])


if __name__ == "__main__":
    create_db()
