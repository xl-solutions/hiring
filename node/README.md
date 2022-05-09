# Corretora ipnet

## Descrição

Este é um teste realizado para a empresa [IPNET Growth Partner](https://ipnet.gupy.io/)
## 🛠 Tecnologias usadas no backend:
Node.js, Typescript

### 📘 Bibliotecas usadas no backend:
Express, Axios, Cors, Dotenv, swc/jest, Jest, ts-node, Eslint

## 🛠 Tecnologias usadas no frontent:
React 18, Typescript

### 📘 Bibliotecas usadas no frontend:
Axios, Apexcharts, Moment, styled-components, Polished, React data table, React data picker, React router dom, Eslint

## Requisitos
[Node.js](https://nodejs.org) com versão acima da 14.x
## Como rodar a API backend:
  * Clone este repositório
  * Vá para pasta backend
  * Download das depêndencias usando o Yarn:
  ```shell
    $ yarn
  ```

  * Download das depêndencias usando o Npm:
  ```shell
    $ npm i
  ```

  * Iniciando a API com Yarn:
  ```shell
    $ yarn dev
  ```

  * Iniciando a API com Npm
  ```shell
    $ npm run dev
  ```
  * Porta da API: 3333

  ## Como rodar o frontend:
  * Clone este repositório
  * Vá para pasta frontend
  * Download das depêndencias usando o Yarn:
  ```shell
    $ yarn
  ```

  * Download das depêndencias usando o Npm:
  ```shell
    $ npm i
  ```

  * Iniciando a API com Yarn:
  ```shell
    $ yarn start
  ```

  * Iniciando a API com Npm
  ```shell
    $ npm run start
  ```
  * Porta do frontend: 3000

  ## Como rodar os testes backend:
  * Clone este repositório
  * Vá para pasta backend
  * Download das depêndencias usando o Yarn:
  ```shell
    $ yarn
  ```

  * Download das depêndencias usando o Npm:
  ```shell
    $ npm i
  ```

  * Iniciando os testes com Yarn:
  ```shell
    $ yarn test
  ```

  * Iniciando os testes com Npm
  ```shell
    $ npm run test
  ```
  * Aguarde até finalizar
  
  ## Observações:

  * Favor verificar se realmente os dados que você está enviando estão corretos e existentes, foram tratados a maioria de errors que fiz a previsão, mas pode acontecer outros problemas. A aplicação tem potencial de crescimento.

  * Por limitação da API Alpha vantage free, ela permite somente 5 consultas por minuto.

  * Outro ponto é que muita das vezes o retorno das horas das datas estavam vindo zeradas, então não foi possivel tratar isso em alguns momentos.

### Endpoints

#### `/stocks/:stock_name/quote` - Retorna a cotação mais recente para a ação ####

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

 ## Author
 ### Daniel Vidal
 * GitHub: https://github.com/denion465
 * Linkedin: https://www.linkedin.com/in/daniel-vidal465