# Python Challange

## Instalação
Antes de execiltar o arquivo instale suas dependências.<br>
Python 3.10.14<br>
É recomendavel que utilize uma virtualenv para não comprometer os pacotes de sua maquina.
```
pip install virtualenv
```
```
virtualenv .venv
```
Linux
```
source .venv/bin/activate
```
Windows

```
.venv/Scripts/activate
```
Todas as dependências da aplicação estão listadas em requirements.txt.
```
pip install -r requirements.txt -t .
```
## Execução
Para executar o script digite:
```
python index.py
```
## Atenção
Para que tenha menos problemas ao tentar execultar a plicação utilize um banco de dados PostgreSQL, com a senha padrao 2208, utilize um container docker para realizar os testes:
```
sudo docker run --name some-postgres -e POSTGRES_PASSWORD=2208 -d postgres 
```
## Entendendo a funcionalidade
Esse pequeno projeto le um modelo especifico de csv e persiste o mesmo no banco de dados (PostgreSQL) e utiliza o mesmo para rederizar uma tabela no em um templeta, a mesma ossui alguns filtros para melhorar a experiencia do usuario.
