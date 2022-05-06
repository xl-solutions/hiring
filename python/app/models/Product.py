from database import db

class Product(db.Model):
    id_product = db.Column(db.Integer, primary_key=True, nullable=False)
    manufacturer = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(30), nullable=False)
    carrier_plan_type = db.Column(db.String(3), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)