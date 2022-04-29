# -*- coding: utf-8 -*-
from math import prod
import os
import pandas as pd
import datatest as dt

from crypt import methods
from flask import Blueprint, request, url_for, redirect, render_template, flash
from .forms import ManufacturerForm, CarrierPlanForm, ProductForm, UploadForm
from .models import Manufacturer, CarrierPlan, Product
from flask import current_app
from sqlalchemy.exc import IntegrityError, NoResultFound
from database.database import db
from sqlalchemy_get_or_create import get_or_create


product = Blueprint('product', __name__, template_folder="templates/products")



@product.route("/", methods=['GET','POST'])
def list():
    """
        View list all products
    """
    products = Product.query.all()
    manufacturers = Manufacturer.query.all()

    print(request.form.get('model'))
    if request.method == 'POST':
        form_data = request.form
        if form_data['manufacturer'] != 'all':
            if form_data['model'] != '':
                print("aqui")
                products = Product.query.filter_by(manufacturer_id=form_data['manufacturer'])
            else:
                products = Product.query.filter_by(manufacturer_id=form_data['manufacturer'])
        else:
            products = Product.query.filter(Product.name.like('%'+form_data['model']+'%'))

    return render_template('list.html', products=products, manufacturers=manufacturers)

@product.route('/import',methods=['GET','POST'])
def upload_files():
    """
    Upload file to server
    """
    FILE_TYPES = set(['csv','txt'])

    error=''
    form = UploadForm()
    if request.method == "POST" and form.validate_on_submit():
        if 'product_file' not in request.files:
            print('aqui')
            flash('No file part')
            return redirect(request.url)
        uploaded_file = request.files['product_file']
        if '.' in uploaded_file.filename and uploaded_file.filename.rsplit('.', 1)[1] in FILE_TYPES:
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            uploaded_file.save(file_path)
            warning = saveCSV(file_path)
            if warning:
                return redirect(url_for('product.list'))
        else:
            pass
    else:
        print(form.validate_on_submit())
        
    return render_template('import.html', form=form)

@product.route('/<id>', methods=['GET','POST'])
def update(id):
    """
    Update Product

    Params:
    id (int): Product id

    Return:
    List Page 
    """

    p = Product.query.get(id)
    form = ProductForm(obj=p)
    if request.method == 'POST' and form.validate_on_submit():
        p.manfacturer_id = form.manufacturer_id.data
        p.name = form.name.data
        p.color = form.color.data
        p.carrier_plan_id = form.carrier_plan_id.data
        p.quantity = form.quantity.data
        p.price = form.price.data
        try:
            db.session.commit()
            flash("Product update sucessfully!")
        except:
            flash("Error on update product")
    else:
        return render_template('update.html', form=form)
    return redirect(url_for('product.list'))

@product.route('/<id>/delete', methods=['GET', 'POST'])
def delete(id):
    """
    Delete object 

    Params:
    id (int): Product id
    """
    p = Product.query.get(id)
    db.session.delete(p)
    db.session.commit()
    flash("Product deleted")

    return redirect(url_for('product.list'))

def verfyobj(manufacturer,model,color,carrier_plan_type,quantity,price):
    """

    This function is a parametrization for data in Manufacture and CarrierPlan
    If CarreirPlan and/or Manufacturer not exist, we created
    Create or update Products

    Params:
    manufacturer (text): Manufacturer name
    model (text): Model name
    color (text): Color name
    carrier_plan_type (text): Carrier Plan name
    quantity: (int): Quantity
    price: (int): Price

    Return:
    str: If error 
    """
    m_kwargs = {'name':manufacturer}
    cp_kwargs = {'name':carrier_plan_type}
    if manufacturer and model and carrier_plan_type and color and price:
        try:
            # Get or create Manufacture and CarreirPlan
            m_object, m_return = get_or_create(db.session, Manufacturer, **m_kwargs)
            cp_object, cp_return = get_or_create(db.session,CarrierPlan, **cp_kwargs)
            p = Product.query.filter_by(manufacturer_id=m_object.id, 
                                        name=model, 
                                        carrier_plan_id = cp_object.id, 
                                        color = color).first()
            if p:
                '''
                    If same (manufacture, name, model, currier_plan)
                    verify if price is different (return error an )
                    else update quantity
                '''
                if p.price != price:
                    error = "Manufacturer: {}, Model: {}, Carrier Plan: {}, Color: {} exists with different price".format(p.manufacturer.name,
                                                                                                              p.name,
                                                                                                              p.carrier_plan.name,
                                                                                                              p.color)
                    return (error)
                p.quantity = p.quantity + quantity
                db.session.commit()
            else:
                p_kwargs = {
                    'manufacturer_id':m_object.id, 
                    'name':model,
                    'color':color,
                    'carrier_plan_id':cp_object.id,
                    'quantity': quantity,
                    'price': price
                }
                p_object, status = get_or_create(db.session, Product, **p_kwargs)
                db.session.commit()
        except NoResultFound:
            print ("ERrrao")
            return NoResultFound
    else:
        flash("Erro na tabela")


def saveCSV(filepath):
    """
    Save data from csvfile to database

    Parameters:
    filepath (path): Where is saved csv file
    """

    data = {}
    col_names = ['manufacturer','model','color','carrier_plan_type','quantity','price']
    csvData = pd.read_csv(filepath, names=col_names, header=1)
  
    errors = []
    for i,row in csvData.iterrows():
        try:
            error = verfyobj(row['manufacturer'],row['model'],row['color'],row['carrier_plan_type'],row['quantity'],row['price'])
            if error:
                return ("Line {} cannot be imported: {}".format(i,error))
        except NoResultFound:
            flash ("ERror")
    



