from app.db import db
from app.db.models import Product

def list():
    products = Product.query.all()
    
    return products