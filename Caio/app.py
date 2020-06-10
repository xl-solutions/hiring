from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import pandas as pd
import csv
import os

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cliente_xl'

mysql = MySQL(app)

def salvar_atualizar(dataFrame):

    cur = mysql.connection.cursor()
    id = 1

    for indice in dataFrame.index:
        try:
            sql = "INSERT INTO inventario (id,modelo, fabricante, estoque, preco_unitario, modalidade_venda) VALUES (%s,%s, %s, %s, %s, %s)"
            valores = (str(id),dataFrame['modelo'][indice],dataFrame['fabricante'][indice],dataFrame['estoque'][indice],dataFrame['preco_unitario'][indice],dataFrame['modalidade_venda'][indice])
            cur.execute(sql,valores)
            mysql.connection.commit()
        except:
            sql = "UPDATE inventario SET  modelo = %s, fabricante=%s, estoque=%s, preco_unitario=%s, modalidade_venda=%s WHERE id=%s"
            valores = (dataFrame['modelo'][indice],dataFrame['fabricante'][indice],dataFrame['estoque'][indice],dataFrame['preco_unitario'][indice],dataFrame['modalidade_venda'][indice],str(id))
            cur.execute(sql,valores)
            mysql.connection.commit()                  
        id = id + 1

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/data', methods=['GET','POST'])
def data():

    if request.method == 'POST' :
        
        f = request.form['csvfile']

        if f == "":
            erro = "Você não escolheu um arquivo! Volte e defina um arquivo válido..."
            return render_template('index.html',data=erro) 
        
        extensao = os.path.splitext(f)
        extensaoPos = extensao[1]

        if extensaoPos != ".csv" and extensaoPos != ".xlsx":
            erro = "Escolha apenas arquivos CSV e XLSX! Volte.."
            return render_template('index.html',data=erro)
        
        if extensaoPos == ".csv":
            
            with open(f) as file:
                
                csvfile = pd.read_csv(file, delimiter=";")
                salvar_atualizar(csvfile)

            return render_template('data.html',data=csvfile.to_html(header=False),mensagem="Dados Salvos no BD!")

        elif extensaoPos == ".xlsx":

            with open(f,"rb") as file:
                
                excelFrame = pd.read_excel(file,header=0)
                salvar_atualizar(excelFrame)
            return render_template('data.html',data=excelFrame.to_html(header=True),mensagem="Dados Salvos no BD!")
                
           
@app.route('/apagar',methods=['GET','POST'])
def apagar():

    if request.method == 'POST':
        cur = mysql.connection.cursor()
        sql = "TRUNCATE TABLE inventario"
        cur.execute(sql)
        mysql.connection.commit()

        mensagem = "Dados Apagados Com Sucesso! Escolha outro CSV..."
        return render_template('index.html',data=mensagem)


@app.route('/voltar',methods=['GET','POST'])
def voltar():
    return render_template('index.html')


@app.route('/buscarModelo',methods=['GET','POST'])
def buscar():
    return render_template("buscaModelo.html")


@app.route('/buscarFabricante',methods=['GET','POST'])
def buscarFabricante():
    return render_template("buscaFabricante.html")


@app.route('/buscarModalidade',methods=['GET','POST'])
def buscarModalidade():
    return render_template("buscaModalidade.html")


@app.route('/livesearch',methods=["POST","GET"])
def livesearch():
    
    search = request.form.get("text")
    cur = mysql.connection.cursor()
    sql = "SELECT * FROM inventario WHERE modelo LIKE '{}%'".format(search)
    cur.execute(sql)
    result = cur.fetchall()
    return jsonify(result)

@app.route('/livesearch2',methods=["POST","GET"])
def livesearch2():
    
    search = request.form.get("text")
    cur = mysql.connection.cursor()
    sql = "SELECT * FROM inventario WHERE fabricante LIKE '{}%'".format(search)
    cur.execute(sql)
    result = cur.fetchall()
    return jsonify(result)

@app.route('/livesearch3',methods=["POST","GET"])
def livesearch3():
    
    search = request.form.get("text")
    cur = mysql.connection.cursor()
    sql = "SELECT * FROM inventario WHERE modalidade_venda LIKE '{}%'".format(search)
    cur.execute(sql)
    result = cur.fetchall()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
