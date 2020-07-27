## Corretora de ações com VueJS e NodeJS - Testes unitários com Jest

### Instalação, execução e build: 

Instalação das dependências:

Dentro da pasta backend execute o comando:
```
npm i
```
Após finalizar o processo haverá sido criado uma pasta com o nome de node_modules

Dentro da pasta frontend execute o comando:
```
npm i
```
Após finalizar o processo haverá sido criado uma pasta com o nome de node_modules


#### Executar projeto

Rodando o backend:

Dentro da pasta backend execute o comando:
```
npm start
```


Dentro da pasta backend execute o comando:

Rodando o frontend:
```
npm run serve
```


#### Realizar testes unitários:

Testes no backend:

Dentro da pasta backend execute o comando:
```
npm run test
```


Testes no frontend:

Dentro da pasta frontend execute o comando:
```
npm run test
```
Obs: para rodar o teste no frontend inicie o projeto backend, os testes utilizam suas rotas


#### Build frontend:

```
npm run build
```

#### Frontend

As funcionalidades:

- Incluir ações no portifólio;
- Ver situação atual das ações (último preço e data e hora da atualização);
- Ver histórico de preços de uma ação, podendo delimitar datas de início e fim;
- Fazer projeção de ganhos de uma ação, determinando o número de ações compradas e a data de compra no passado.



#### Backend

Endpoints

`/stocks/:stock_name/quote` - Retorna a cotação mais recente para a ação ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)

Retorno:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string // data e hora no formato ISO 8601, UTC
}
```

Exemplo de uso:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/PETR4.SA/quote
{ "name": "PETR4.SA", "lastPrice": 25.11, "pricedAt": "2017-06-23T14:15:16Z" }
```

#### `/stocks/:stock_name/history?from=<string>&to=<string>` - Retorna preço histórico da ação num intervalo inclusivo ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- `from` - string com data em formato ISO 8601
- `to` - string com data em format ISO 8601

```js
{
  "name": string,
  "prices": [<pricing>, <pricing>, ...]
}
```

O schema de `pricing` segue abaixo:

```js
{
  "opening": number,
  "low": number,
  "high": number,
  "closing": number,
  "pricedAt": string // data no formato ISO 8601, UTC
}
```

Exemplo de uso:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/PETR4.SA/history?from=2017-04-04&to=2017-04-05
{ "name": "PETR4.SA", "prices": [{ "opening": 14.67, "low": 14.57, "high": 14.89, "closing": 14.85, "pricedAt": "2017-04-04" }, { "opening": 15.05, "low": 14.50, "high": 15.16, "closing": 14.57, "pricedAt": "2017-04-05" }
```

#### `/stocks/:stock_name/compare` - Compara uma ação com uma ou mais ações ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- Payload JSON com uma lista de ações:

```js
{
  "stocks": [<string>, <string>, ...]
}
```

Retorno:

```js
{
  "lastPrices": [<lastPrice>, <lastPrice>...]
}
```

`lastPrice` tem o seguinte schema:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string // data e hora no formato ISO 8601, UTC
}
```
  
Exemplo de uso:

```
$ curl -H "Accept: application/json" -H "Content-Type: application/json" -d '{ "stocks": ["TIMP3.SA", "VIVT4.SA"] }' http://coolfinancialservice.com/stock/OIBR4.SA/compare
{ "lastPrices": [{ "name": "OIBR4.SA", "lastPrice": 3.41, "pricedAt": "2017-05-18T14:15:16Z" }, { "name": "TIMP3.SA", "lastPrice": 9.93, "pricedAt": "2017-05-18T14:15:16Z" }, { "name": "VIVT4.SA", "lastPrice": 45.92 }]}
```
  
#### `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Projeta ganhos com compra em uma data específica ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- `purchasedAmount` - `number` com o número de ações
- `purchasedAt` - `string` com data de compra em formato ISO 8601

Retorno:

```js
{
  "name": string,
  "purchasedAmount": number,
  "purchasedAt": string, // data em formato ISO 8601,
  "priceAtDate": number, // preço na data de compra
  "lastPrice": number,   // preço mais recente
  "capitalGains": number // ganhos ou perdas com a ação, em reais
}
```

Exemplo de uso:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/USIM5.SA?purchasedAmount=100&purchasedAt=2016-05-31
{ "name": "USIM5.SA", "purchasedAmount": 100, "purchasedAt": "2016-05-31", "priceAtDate": 3.97, "lastPrice": 4.33, "capitalGains": 36.0 }
```