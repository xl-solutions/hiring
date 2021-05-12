from flask import Blueprint, render_template
from app.controller import product_controller


main = Blueprint('main', __name__)

@main.route('/')
def index():
    products = product_controller.list()
    
    return render_template('index.html')
