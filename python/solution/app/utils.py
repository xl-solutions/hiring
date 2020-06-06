
from peewee import Database
from stock import models


def create_db(db: Database):
    with db:
        db.create_tables([models.Product, ])
