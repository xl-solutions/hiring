import pytest
import io

from app import app 

def test_index_route():
	response = app.test_client().get("/")

	assert response.status_code == 200
	assert "Aplicação FlaskCell&reg;" in response.data.decode('utf-8')
	assert "É apenas uma tentativa!" in response.data.decode('utf-8')
	assert "Faça o upload de um csv aqui para cadastrar ou atualizar produtos:" in response.data.decode('utf-8')
	assert '<input type="file" name="file" id="file_input" />' in response.data.decode('utf-8')
	assert '<input type="submit"/>' in response.data.decode('utf-8')

def test_uploader_route_valid_input():
	data={'file': (io.BytesIO(b"a,b,c\n1,2,3"), 'input_valid.csv')}
	response = app.test_client().post(
		"/uploader", data=data,
		content_type='multipart/form-data'
	)
	assert response.status_code == 200
	assert 'Arquivo carregado com sucesso, acesse <a href="/filtros">Tela de filtragem</a> para visualizar os itens carregados' in response.data.decode('utf-8')

def test_uploader_route_invalid_input():
	data={'file': (io.BytesIO(b"a,b,c\n1,2,3"), 'input_invalid.csv')}
	response = app.test_client().post(
		"/uploader", data=data,
		content_type='multipart/form-data'
	)
	assert response.status_code == 400
	assert 'A linha de dados' in response.data.decode('utf-8')
	assert 'está com incompatibilidade de itens' in response.data.decode('utf-8')



    