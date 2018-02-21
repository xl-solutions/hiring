# Technical test - XL Solutions 

This test was implemented using NodeJS to the backend and the [VueJS](https://vuejs.org/) with [Quasar Framework](http://quasar-framework.org/) to the frontend .
If you want to know more about the proposal of the test using NodeJS, access:

- [NodeJS](doc-node-test/README_ENGLISH.md)

## How to run the project?

- Clone the project
- Acess the project directory

### Running application

<p>The application offer somes commands with npm to run client and server.</p>

- *"npm start"*: Will be start server on port 3000 and client on 8000
- *"npm run start-server"*: Run only server using port 3000
- *"npm run start-client"*: Run only client using port 8000

### Testing application

The application tests must be run individually. The client test will create a report in *"client/test/unit/coverage/lcov-report/index.html
"*. Use the following commands to do this:

- *"npm run test-server"*: Run server tests
- *"npm run test-client"*: Run client tests

### Client routes

The client will be offer tree routes

- /portfolio
- /history
- /gains

### Server Endpoints

The server offer four endpoits:

#### `/stocks/:stock_name/quote` - Returns the last price of a stock ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: BVMF:PETR4, BVMF:VALE3, NASDAQ:AAPL)

Return:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string // date and time in ISO 8601, UTC format
}
```

#### `/stocks/:stock_name/history?from=<string>&to=<string>` - Historic price of a stock in a given date range ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: BVMF:PETR4, BVMF:VALE3, NASDAQ:AAPL)
- `from` - string with date in ISO 8601 format
- `to` - string with date in ISO 8601 format

Return:
```js
{
  "name": string,
  "prices": [<pricing>, <pricing>, ...]
}
```

The pricing scheme is shown bellow:

```js
{
  "opening": number,
  "low": number,
  "high": number,
  "closing": number,
  "pricedAt": string with date in ISO 8601 UTC format
}
```

#### `/stocks/:stock_name/compare` - Compares a stock with one or more stocks ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: BVMF:PETR4, BVMF:VALE3, NASDAQ:AAPL)
- Payload JSON with stock list:

```js
{
  "stocks": [<string>, <string>, ...]
}
```

Return:

```js
{
  "lastPrices": [<lastPrice>, <lastPrice>...]
}
```

`lastPrice` scheme:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string with date in ISO 8601 UTC format
}
```

#### `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Gain projection for a specific date ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: BVMF:PETR4, BVMF:VALE3, NASDAQ:AAPL)
- `purchasedAmount` - `number` amount of stocks
- `purchasedAt` - `string` string with date in ISO 8601 format

Return:

```js
{
  "name": string,
  "purchasedAmount": number,
  "purchasedAt": string, // string with date in ISO 8601 format,
  "priceAtDate": number, // Acquisition date price
  "lastPrice": number,   // Current price
  "capitalGains": number // Gain or losses with the stock
}
```