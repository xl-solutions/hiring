import json
from db_management import create_data, get_data, get_filter_data
from utils import format_json
from flask import Flask, request, redirect, render_template
import pandas as pd

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    
    return render_template('index.html')

@app.route('/create', methods=['POST'])
def create_itens():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'csv' not in request.files:
            return "sem dados", 400
        
        file = request.files.get('csv') #arquivo csv
        
        if file.filename == '':
            return "sem dados", 400
        
        try:
            df = pd.read_csv(file)
            df = json.loads(df.to_json())
        except:
            return "sem cvs", 409
        
        else:
            formated_json = format_json(df)
            
            is_created = create_data(formated_json)
            if not is_created:
                return "nao foi possivel inserir cvs", 500
            
            if is_created:
                num_items = len(formated_json)
                df = {'num': num_items}
                return df, 201
            else:
                return "erro", 500
    return redirect('/')

@app.route('/get_itens', methods=['GET'])
def get_itens():
    itens = get_data()

    df = {
        'itens': itens
    }
    return json.dumps(df)

@app.route('/get_filter', methods=['GET'])
def get_filter():# dados dos filtros da tabela, podem ser atualizados de forma assincrona
    
    data_filter = get_filter_data()

    
    return json.dumps(data_filter)


if __name__ == "__main__":
    app.run()