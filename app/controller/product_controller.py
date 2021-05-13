from app.dao import product_dao


def list():
    products = product_dao.list()
    
    return products