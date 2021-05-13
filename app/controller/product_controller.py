import csv
from app.dao import product_dao


def list():
    products = product_dao.list()
    
    return products


def import_product(file):
    upload_file = file['upload_csv']
    products = []
    
    if upload_file.filename == '':
        pass
    
    csvfile = csv.reader(open(upload_file.filename), delimiter=',')
    
    next(csvfile, None)
    
    for row in csvfile:
        product = dict()
        product['manufacturer'] = row[0]
        product['model'] = row[1]
        product['color'] = row[2]
        product['carrier_plan_type'] = row[3]
        product['quantity'] = row[4]
        product['price'] = row[5]
        
        products.append(product)
        
    
    for product in products:
        product_dao.save(product)
    

    
    
    