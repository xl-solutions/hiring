
from peewee import (
    Model, CharField, IntegerField, DecimalField
)
from app.app import db


class BaseModel(Model):
    class Meta:
        database = db


class Product(BaseModel):
    manufacturer = CharField(max_length=50)
    model = CharField(max_length=80)
    color = CharField(max_length=10)
    carrier_plan_type = CharField(max_length=3)
    quantity = IntegerField()
    price = DecimalField(max_digits=7, decimal_places=2)
