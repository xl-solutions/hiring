# Backend Node - test

API simples para consumir os serviços da [Alpha Vantage](https://www.alphavantage.co/).

### Execução
Após clonar o projeto, navegar até a pasta do projeto clonado e seguir as seguintes etapas.

Instalar as dependências do projeto:
```sh
$ npm test
```

Execução dos testes:
```sh
$ npm test
```
Executar o projeto:
```sh
$ npm start
```
A API ficará disponível na URL: `localhost:5000`

### Recursos disponíveis

`/stocks/{stock_name}/quote` - Retorna a cotação mais recente para a ação

`/stocks/{stock_name}/history?from={iso_date}&to={iso_date}` - Retorna preço histórico da ação num intervalo inclusivo

`/stocks/{stock_name}/compare` - Compara uma ação com uma ou mais ações

`/stocks/{stock_name}/gains?purchasedAmount={number}&purchasedAt={iso_date}` - Projeta ganhos com compra em uma data específica


### Detalhes técnicos
Foi criado um serviço que ficou responsável por abstrair as funcionalidade e executar as requisições para o Alpha Vantage. Para isso, foi usado o `axios` como cliente para efetuar as requisições.

Para os testes, as libs usadas foram: `chai`, `chai-http` e `mocha`.

As validações de requisição foram feitas utilizando a lib `joi`. Caso haja algum erro de validação na requisição, a API retornará um erro com status code 400 e uma mensagem explicativa do erro.

Para fazer o error handling de requisições http, foi utilizado a lib `http-errors`.
