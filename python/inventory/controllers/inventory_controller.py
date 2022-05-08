from flask import render_template, redirect, flash, request, url_for
import csv
from sqlalchemy import and_
import os
import numpy as np
from inventory.database import db
from inventory.models.Product import Product

ALLOWED_EXTENSIONS = {"csv"}


def home_inventory():
    """ Pagina inicial do inventário """
    return render_template('index.html')


def list_inventory():
    if(request.args != {}):

        all_itens = True
        for q in request.args.values():
            if q != '':
                all_itens = False

        if(all_itens):
            products = Product.query.all()
            filters = Product.query.all()

            return render_template('/inventory/index.html', products=products, filters=filters)

        manufacturer = request.args.get('manufacturer')
        model = request.args.get('model')
        color = request.args.get('color')
        carrier_plan_type = request.args.get('carrier_plan_type')

        querys = []

        if not manufacturer == '':
            querys.append(Product.product_manufacturer == manufacturer)
        if not model == '':
            querys.append(Product.product_model == model)
        if not color == '':
            querys.append(Product.product_color == color)
        if not carrier_plan_type == '':
            querys.append(Product.product_carrier_plan_type ==
                          carrier_plan_type)

        products = Product.query.filter(and_(*querys))

        filters = Product.query.all()
        return render_template('/inventory/index.html', products=products, filters=filters)

    products = Product.query.all()
    filters = Product.query.all()

    return render_template('/inventory/index.html', products=products, filters=filters)


def upload_products_inventory():
    ERROR_FILE_URL = 'inventory_bp.list_inventory'
    file = request.files['file']

    if file.filename == '':
        flash('Erro, O formulario estava vazio, tente enviar novamente', 'alert-danger')
        return redirect(url_for(ERROR_FILE_URL))

    if allowed_file(file.filename) == False:
        flash('Erro, Formato de arquivo incorreto', 'alert-danger')
        return redirect(url_for(ERROR_FILE_URL))

    file.save(os.path.join('/tmp', file.filename))
    with open('/tmp/'+file.filename, 'r') as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',')
        first_row = next(csv_reader)

        if index_file_validator(first_row) == False:
            return redirect(url_for(ERROR_FILE_URL))

        for row in csv_reader:
            if number_of_columns_file_validator(row) == False:
                return redirect(url_for(ERROR_FILE_URL))

            product = Product()
            product.product_manufacturer = row[0]
            product.product_model = row[1]
            product.product_color = row[2]
            product.product_carrier_plan_type = row[3]
            product.product_quantity = row[4]
            product.product_price = row[5]

            db.session.add(product)
            db.session.commit()

    flash('Arquivo Extraido com sucesso', 'alert-success')
    return redirect(url_for('inventory_bp.list_inventory'))


# Funções de validação do upload
def allowed_file(filename):
    """ Valida o formato do arquivo """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def number_of_columns_file_validator(row):
    if len(np.asanyarray(row)) != 6:
        flash('Erro, Quantidade de colunas menor ou maior que 6', 'alert-danger')
        return False
    return True


def index_file_validator(row):
    number_of_columns_file_validator(row)
    valid_index = ['manufacturer', 'model', 'color',
                   'carrier_plan_type', 'quantity', 'price']

    if(valid_index != row):
        flash('Erro, Index do arquivo com campos errados', 'alert-danger')
        return False
    return True
