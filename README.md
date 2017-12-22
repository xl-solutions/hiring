# README

# Importadodor de arquivos csv

## Dependências do Sistema

* Ruby version ruby 2.3.1p112
* Rails version rails (5.0.6)

## Configuração Básica

* Clone este repositorio
* Instale as demais dependencias com `bundle install`

## Banco de dados

* Este projeto esta configurado para ser usado com sqlite, por sem mais simples, porém se for de interesse basta editar o arquivo config/database.yml acrescentando as informações de acesso ao banco para o mesmo rodar em postgresql(testado), mysql(não testado), para um funcionamento normal

* Criação do banco de dados: para a criação do banco de dados basta executar `rake db:create` e para inicia o banco execute `rake db:migrate`

## Suite de teste
* Os testes estão escritos usando Minitest, o projeto possui teste de aceitação na pasta test/features e tambem testes unitarios na pasta test/controllers, para executa-los basta rodar `rake` 

## Exemplo de arquivo importado
```
fabricante,modelo,cor,modalidade,quantidade,valor
Motorola,Moto G5 16GB,Preto,pre,20,1299
Motorola,Moto G5 16GB,Preto,pos,20,599

```

