# XL Celulares
### Instalação (Linux)

1. Crie um banco de dados PostgreSQL que vai ser usado na aplicação. Tenha em mãos o nome desse banco, além de username e senha de um usuário com permissões sobre ele.
2. Certifique-se que esse mesmo usuário tenha permissão para criar outro banco de dados e ler do banco embutido `postgres` (Necessário para os testes automatizados).
3. Na pasta `hiring/python/xlcelulares`, execute o comando `python3 -m venv venv` para criar o ambiente virtual.
4. Execute o comando `source ./venv/bin/activate` para ativar o ambiente virtual. A seguir, execute `pip install -r requirements.txt`para baixar as dependências.
5. No arquivo `xlcelulares/xlcelulares/settings.py`, insira as informações sobre o banco de dados na seção `DATABASES`, substituindo os valores `NAME`, `USER`, e `PASSWORD` pelos dados obtidos em [1]. Troque os valores em `HOST` e `PORT`se necessário.
6. Volte a `hiring/python/xlcelulares`. Execute o comando `./manage.py makemigrations`.
7. Execute agora `./manage.py migrate` para criar as tabelas do projeto em banco.


### Testes e execução
Para rodar os testes automatizados execute `./manage.py test`. Serão executados seis testes com entrada de arquivos em condição válida e inválida. As situações de teste presentes no projeto são:
1. Arquivo apresenta mais valores do que o número de colunas da entrada padrão.
2. Arquivo apresenta menos valores do que o esperado (para este projeto todos os campos são requeridos).
3. Arquivo apresenta incompatibilidade de tipos (ex.: foi informada uma string onde deveria constar um inteiro).
4. O cabeçalho de colunas do arquivo difere da entrada padrão.
5. A extensão do arquivo não é csv.
6. Teste do comportamento esperado com arquivo válido.

A saída dos testes deve ser: 
```
OK 
Destroying test database for alias 'default'...
```
Para rodar a aplicação use:
```
./manage.py runserver 0:<PORTA>
```
Onde `<PORTA>` é uma porta TCP livre onde a aplicação vai funcionar. Acesse a aplicação através do seu navegador, com `localhost:<PORTA>`.