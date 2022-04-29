# Requisitos 

python\
python-pip


# Instalação

Para rodar o sistema você deverá entrar na pasta online_store e executar o comando

`pip install -r requirements.txt`


`export FLASK_APP=app`
`export FLASK_ENV=development`

Depois é só rodar o comando:

`flask run`

A aplicação estará rodando no endereço http://localhost:5000


As urls para uso são:


Para importar o csv

http://localhost:5000/product/import

Para listar os produtos importados

http://localhost:5000/product/list

