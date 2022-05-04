from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import csv

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stock.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Stock(db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
    manufacturer = db.Column(db.String(100))
    model = db.Column(db.String(100))
    color = db.Column(db.String(100))
    carrier_plan_type = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Integer)

db.create_all()

@app.route("/")
def hello_world():
    return render_template('index.html')


@app.route('/uploader', methods = ['POST'])
def upload_file():
    '''
    Essa função deve receber um formulário multipart formdata com apenas arquivos csv's
    e carregar ele em banco de dados sqlite
    '''
    if request.method == 'POST':
        f = request.files['file']
        if  allowed_file(f.filename) == False:
            return 'Arquivo inválido, por favor envie um arquivo *.csv'
        else:
            print(f.filename)
            rows = []
            with open(f.filename, 'r') as file:
                csvreader = csv.reader(file)
                header = next(csvreader)
                for row in csvreader:
                    rows.append(row)
            print(header)
            print(rows)
            # Verificar se meu arquivo tem todos os itens do header
            default_headers = set(["manufacturer","model","color","carrier_plan_type","quantity","price"])
            if default_headers == set(header):
                print("Todas os campos do cabeçalho estão aqui")
            else:
                return "Sua tabela está com inconsistência de campos do cabeçalho"
            # Verificar se cada linha está completa
            for i, row in enumerate(rows):
                if(len(row) < 6):
                    return f"A linha de dados {i+2} está com incompatibilidade de itens", 400
            # Salvar ou atualizar o banco de dados
            for row in rows:
                stock = Stock(manufacturer=row[0], model=row[1], color=row[2], carrier_plan_type=row[3], quantity=row[4], price=row[5])
                db.session.add(stock)
            db.session.commit()
            return '''
            Arquivo carregado com sucesso, acesse <a href="/filtros">Tela de filtragem</a> para visualizar os itens carregados
            ''', 200
      

def allowed_file(filename):
    '''
    Verifica extensão do arquivo
    '''
    ALLOWED_EXTENSIONS = {'csv'}

    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




      
