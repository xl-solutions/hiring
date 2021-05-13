from app.db import db
from app.db.models import Product

def list():
    products = Product.query.all()
    
    return products


def save(product_csv):
    manufacturer = product_csv['manufacturer']
    model = product_csv['model']
    color = product_csv['color']
    carrier_plan_type = product_csv['carrier_plan_type']
    quantity = product_csv['quantity']
    price = product_csv['price']
    
    product = Product(
        manufacturer=manufacturer,
        model=model,
        color=color,
        carrier_plan_type=carrier_plan_type,
        quantity=quantity,
        price=price,
    )
    
    db.session.add(product)
    db.session.commit()