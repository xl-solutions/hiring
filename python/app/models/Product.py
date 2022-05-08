from app.database import db

class Product(db.Model):
    product_id = db.Column(db.Integer, primary_key=True, nullable=False)
    product_manufacturer = db.Column(db.String(255), nullable=False)
    product_model = db.Column(db.String(255), nullable=False)
    product_color = db.Column(db.String(30), nullable=False)
    product_carrier_plan_type = db.Column(db.String(3), nullable=False)
    product_quantity = db.Column(db.Integer, nullable=False)
    product_price = db.Column(db.Float, nullable=False)

