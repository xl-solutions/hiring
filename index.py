import json
import os
from db_management import create_data, get_data
from utils import format_json
from flask import Flask, flash, request, redirect, render_template
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
            flash('No file part')
            return redirect(request.url)
        
        file = request.files.get('csv') #arquivo csv
        
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        
        try:
            df = pd.read_csv(file)
            df = json.loads(df.to_json())
        except:
            flash("por favor selecone um cvs")
        
        else:
            formated_json = format_json(df)
            is_created = create_data(formated_json)
            if is_created:
                print("dados criados com sucesso")
            else:
                print("erro ao criar dados")

@app.route('/get_itens', methods=['GET'])
def get_itens():
    itens = get_data()
    print(itens)
    df = {
        'itens': itens
    }
    return json.dumps(df)

if __name__ == "__main__":
    app.run()