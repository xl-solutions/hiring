# Descrição

Nesse teste foi implementado o backend em NodeJs e o frontend em ReactJs.

### Rodando a aplicação

<p>Foram disponibilizado alguns comandos para facilitar a inicialização do projeto: </p>

- "npm run test-api" ou "yarn test-api": Roda os testes no servidor .
- "npm run start-api" ou "yarn start-api": Instala os pacotes do Nodejs e roda apenas a api (porta 3333).
- "npm run start-web" ou "yarn start-web": Instala os pacotes do ReactJs e roda apenas a aplicação web (porta 3000).
- "npm start" ou "yarn start": Roda tanto o servidor como a aplicação web.
  **Lembrando que talvez seja necessário executar o comando "npm install" ou "yarn" dentro de cada pasta antes de executar, assim serão instalados os pacotes necessários**

### Utilizando a aplicação WEB

- Após iniciar, ja será realizada uma chamada à api com o ativo "VALE3.SA" e exibirá a cotação atual e seu histórico;
- É possivel fazer a busca de uma ação no campo superior central, ja informando as datas caso necessário.
- Para simular ganhos, é necessário informar a quantidade de açoes, assim como a data de compra na parte inferior, e clicar em "simular"

### Utilizando o servidor ()

Foram implementados 4 endpoints no servidor:

#### `/stocks/:stock_name/quote`

Retorna a cotação mais recente da ação.

Entradas:

- `stock_name` - string (Nome da ação)

Retorno:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string   (data no formato UTC ISO 8601)
}
```

#### `/stocks/:stock_name/history?from=<string>&to=<string>`####

Retorna o historico da ação no periodo enviado.

Entradas:

- `stock_name` - string (Nome da ação)
- `from` - string (data no formato UTC ISO 8601)
- `to` - string (data no formato UTC ISO 8601)

Retorno:

```js
{
  "name": string,
  "prices": [<pricing>, <pricing>, ...]
}
```

O 'pricing' é da forma:

```js
{
  "opening": number,
  "low": number,
  "high": number,
  "closing": number,
  "pricedAt": string (data no formato UTC ISO 8601)
}
```

#### `/stocks/:stock_name/compare`

Retorna a cotação atual das açoes enviadas.

Entradas:

- `stock_name` - string (Nome da ação)
- Payload JSON (lista de ações):

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

'lastPrice' é da forma:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string  (data no formato UTC ISO 8601)
}
```

#### `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>`####

Projeta os ganhos de uma açao comprada na data especificada

Entrada:

- `stock_name` - string (Nome da ação)
- `purchasedAmount` - `number` (Quantidade de ações)
- `purchasedAt` - `string` (data no formato UTC ISO 8601)

Retorno:

```js
{
  "name": string,
  "purchasedAmount": number,
  "purchasedAt": string (data de compra no formato UTC ISO 8601),
  "priceAtDate": number (preço da ação na data de compra),
  "lastPrice": number (ultima cotação da açao),   // Current price
  "capitalGains": number (Ganho capital)// Gain or losses with the stock
}
```
