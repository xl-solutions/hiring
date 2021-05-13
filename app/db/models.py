from . import db
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column('id', db.Integer, primary_key=True)
    manufacturer = db.Column('manufacturer', db.String(100), nullable=False)
    model = db.Column('model', db.String(100), nullable=False)
    color = db.Column('color', db.String(100), nullable=False)
    carrier_plan_type = db.Column('carrier_plan_type', db.String(100), nullable=False)
    quantity = db.Column('quantity', db.Integer, nullable=False)
    price = db.Column('price', db.Numeric(10,2))
    created_at = db.Column('created_at', db.DateTime, default=datetime.utcnow)
