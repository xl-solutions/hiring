# -*- coding: utf-8 -*-

from ast import Sub
from email.policy import default
from flask_wtf.file import FileRequired, FileAllowed
from flask_wtf import CSRFProtect, FlaskForm
from wtforms import SelectField, SubmitField, FileField
from wtforms_alchemy import ModelForm

from .models import (Manufacturer, CarrierPlan, Product)

crsf = CSRFProtect()

class UploadForm(FlaskForm):
    product_file = FileField('Product file', validators=[FileRequired(), FileAllowed(['csv','txt'], "Csv and txt files only!")])
    upload = SubmitField('Upload')

class ManufacturerForm(ModelForm, FlaskForm):
    class Meta:
        model = Manufacturer


class CarrierPlanForm(ModelForm):
    class Meta:
        model = CarrierPlan


class ProductForm(ModelForm, FlaskForm):
    class Meta:
        model = Product

    manufacturer_id = SelectField('Manufacturer', coerce=int)
    carrier_plan_id = SelectField('Carrier Plan', coerce=int)


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        defaultManufacturer = self.manufacturer_id.data
        defaultCarrierPlan = self.carrier_plan_id.data
        self.manufacturer_id.choices = [(m.id, m.name) for m in Manufacturer.query.all()]
        self.manufacturer_id.default = defaultManufacturer
        self.carrier_plan_id.choices = [(cp.id, cp.name) for cp in CarrierPlan.query.all()]
        self.carrier_plan_id.default = defaultCarrierPlan

    submit = SubmitField("Update")
