from flask import Blueprint, request, render_template, url_for, redirect, flash
from app.controller.form import UploadFile
from app.controller import product_controller


main = Blueprint('main', __name__)

@main.route('/')
def index():
    try:
        products = product_controller.list()
        
        return render_template('index.html', products=products)
    except Exception:
        flash('Erro interno')
    
    return render_template('index.html')


@main.route('/import', methods=['GET', 'POST'])
def import_file():
    try:
        form = UploadFile(request.form)
        file = request.files
        
        if request.method == 'POST':
            product_controller.import_product(file)
            flash('Arquivo importado com sucesso', 'success')
            
            return redirect(url_for('main.index'))
    except Exception:
        flash('Arquivo não encontrado ou com formato inválido. Tente novamente!', 'danger')
        
    return render_template('import.html', form=form)


@main.route('/search')
def search():
    try:
        filter = request.args['filter']
        data_search = request.args['data']
            
        products = product_controller.search(filter, data_search)
        
        return render_template('index.html', products=products)
    except Exception:
        flash('Tipo de filtro não preenchido', 'danger')

    return render_template('index.html')
