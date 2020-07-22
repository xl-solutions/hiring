# Descrição

Nesse teste foi implementado o backend em NodeJs e o frontend em ReactJs.


### Rodando a aplicação


<p>Foi disponibilizado alguns comandos para facilitar a inicialização do projeto: </p>

- "npm run test-api": Roda os testes no servidor .
- "npm run start-api": Roda apenas o servidor (porta 3333).
- "npm run start-web": Roda apenas a aplicação web (porta 3000).
- "npm start": Roda tanto o servidor como a aplicação web.


### Usando a aplicação WEB

- Após iniciar, ele ja ira fazer uma chamada a api com a ação "PETR4.SA" e exibir a cotaçao atual e seu historico;
- É possivel fazer a busca de uma ação no campo superior esquerdo.
- Para simular ganhos, basta colocar a quantidade de açoes e a data de compra da ação na parte inferior, e clicar em "simular"
- No grafico central, é possivel clicar em um ponto e visualizar as informaçoes da ação na data do ponto.


### Usando o servidor ()

Foram implementados 4 endpoints no servidor:

#### `/stocks/:stock_name/quote` ####

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

O <pricing> é da forma:

```js
{
  "opening": number,
  "low": number,
  "high": number,
  "closing": number,
  "pricedAt": string (data no formato UTC ISO 8601)
}
```

#### `/stocks/:stock_name/compare` ####

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

<lastPrice> é da forma:

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
