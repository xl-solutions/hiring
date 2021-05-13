from flask import Blueprint, request, render_template, url_for, redirect
from app.controller.form import UploadFile
from app.controller import product_controller


main = Blueprint('main', __name__)

@main.route('/')
def index():
    products = product_controller.list()
    
    return render_template('index.html', products=products)


@main.route('/import', methods=['GET', 'POST'])
def import_file():
    form = UploadFile(request.form)
    file = request.files
    
    if request.method == 'POST':
        product_controller.import_product(file)
        
        return redirect(url_for('main.index'))
        
    return render_template('import.html', form=form)
