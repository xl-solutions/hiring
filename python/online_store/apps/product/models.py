# -*- coding: utf-8 -*-
# from turtle import back
from database.database import db
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

class Manufacturer(db.Model):
    """
    Model Manufacture

    Attributes:
        name (str): Manufacturer name
        products (int): Ralation with Product model
    """
    __tablename__= "product_manufacturer"

    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    products = db.relationship('Product', backref='manufacturer', cascade='all, delete-orphan', lazy='dynamic')

    def __init__(self, name):
        self.name = name


    def __repr__(self):
        return '<Manufacturer %r>' % self.name

class CarrierPlan(db.Model):
    """
    Carrier Product

    Attributes:
        name (str): Carrier Plan name
        product (int): Relation with Product model
    """

    __tablename__ = "product_carrierplan"

    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    name = db.Column(db.String(6), nullable=False)
    products = db.relationship('Product', backref='carrier_plan', cascade='all, delete-orphan', lazy = 'dynamic')

    def __init__(self, name):
        self.name = name


    def __repr__(self):
        return '<CarrierPlan %r>' % self.name



class Product(db.Model):
    """
    Model Product

    Attributes:
        manufacute_id (int): ForeignKey for model Manufacture
        name (str): Product name
        carrier_plan_id (int): ForeignKey for model CarrierPlan
        color (string): Color name
        quantity (real)
    """
    __tablename__= "product_product"

    #Constraint unique attributes (manufacturer, carrier_plan, name and color)
    __table_args__ = (
        db.UniqueConstraint('manufacturer_id','carrier_plan_id','name','color', name='unique_modeltype_commit'),
    )

    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey('product_manufacturer.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    carrier_plan_id = db.Column(db.Integer, db.ForeignKey('product_carrierplan.id'), nullable=False)
    color = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)

    def __init__(self, manufacturer_id, name, carrier_plan_id, color, quantity, price):
    
        self.manufacturer_id = manufacturer_id
        self.name = name
        self.carrier_plan_id = carrier_plan_id
        self.color = color
        self.quantity = quantity
        self.price = price

    def __repr__(self):
        return '<Product %r>' % self.name

