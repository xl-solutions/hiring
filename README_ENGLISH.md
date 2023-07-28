# Background

A stock broker is developing a system to allow investors to make better decisions about their portfolio. A important feature is to verify an stock performance in five scenarios:

  - Current price;
  - Historic price;
  - Current price vs other stocks;
  - Gains projection with a specific date acquisition.
  
To accomplish that, the software company decided to develop two applications: a backend service specialized in the requirements (that will allow the two features to be reusable in other products of the company) and a configurable dashboard that will allow data visualization. Your mission is to develop both parts.
   

# Technical Requirements

The service must be implemented via HTTP, and the requests and responses will be JSON. The backend should be implemented in node.js with pure http or any framework of your choice. The frontend will be a single-page application (SPA), and can be implemented in any solution of your choice: Angular, Angular 2/4, Vue, js, React or anything you may like. Provide a Webpack build, rollup, browserify or any other solution of your choice and a single command line to run your application.

Your solution must have automated tests from both frontend and backend.

To obtain the stock information you may use Alpha Vantage (https://www.alphavantage.co). If you find libraries for that, you are allowed to use them.

The error handling will not be specified. The candidate may interfere in the error cases or duplicity, and handle them. The absense of this error handling will not disqualify the test; The presence of those will count extra points.

## Gain projections

The idea is to implement something simple, without taking in consideration dividends, administrative taxes or any other indexes that could affect the total amount. Assume that the investor has invested an amount of money on a stock some time in the past, and that he needs to know how much money he would have gain or lost.

# Test delivery procedures:

1. Fork this project on github;
2. Build your code on the fork;
3. Write a README explaining how to run your application and the tests. Give as much details as possible;
4. Open a pull request when you are done;

# Details

## Frontend

The most important part of this challenge is that we understand how to handle components that build the current technics to build client-side development in terms of assets processing, transpilers, responsibility segregation, minification, local storage, etc. Esthetics are not important.

Features:

- Add stocks to the portfolio;
- Check current stock  information (last price, date and time of last update);
- See historic stock price, allowing a data rage;
- Make a gains projection of a stock based on a past date of acquisition;

If you don't know how to organize this features, You may use Yahoo Finance to get inspiration or make a simple master-detail.

## Backend

### Endpoints

#### `/stocks/:stock_name/quote` - Returns the last price of a stock ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: PETR4.SA, VALE5.SA)

Return:

```js
{
  "name": string,
  "lastPrice": number,
  "pricedAt": string // date and time in ISO 8601, UTC format
}
```

Use case:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/PETR4.SA/quote
{ "name": "PETR4.SA", "lastPrice": 25.11, "pricedAt": "2017-06-23T14:15:16Z" }
```

#### `/stocks/:stock_name/history?from=<string>&to=<string>` - Historic price of a stock in a given date range ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: PETR4.SA, VALE5.SA)
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

Use case:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/PETR4.SA/history?from=2017-04-04&to=2017-04-05
{ "name": "PETR4.SA", "prices": [{ "opening": 14.67, "low": 14.57, "high": 14.89, "closing": 14.85, "pricedAt": "2017-04-04" }, { "opening": 15.05, "low": 14.50, "high": 15.16, "closing": 14.57, "pricedAt": "2017-04-05" }
```

#### `/stocks/:stock_name/compare` - Compares a stock with one or more stocks ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: PETR4.SA, VALE5.SA)
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
  
Use case:

```
$ curl -H "Accept: application/json" -H "Content-Type: application/json" -d '{ "stocks": ["TIMP3.SA", "VIVT4.SA"] }' http://coolfinancialservice.com/stock/OIBR4.SA/compare
{ "lastPrices": [{ "name": "OIBR4.SA", "lastPrice": 3.41, "pricedAt": "2017-05-18T14:15:16Z" }, { "name": "TIMP3.SA", "lastPrice": 9.93, "pricedAt": "2017-05-18T14:15:16Z" }, { "name": "VIVT4.SA", "lastPrice": 45.92 }]}
```
  
#### `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Gain projection for a specific date ####

Input:

- `stock_name` - URI passed parameter indicating the stock name (Ex: PETR4.SA, VALE5.SA)
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

Use case:

```
$ curl -H "Accept: application/json" http://coolfinancialservice.com/stock/USIM5.SA?purchasedAmount=100&purchasedAt=2016-05-31
{ "name": "USIM5.SA", "purchasedAmount": 100, "purchasedAt": "2016-05-31", "priceAtDate": 3.97, "lastPrice": 4.33, "capitalGains": 36.0 }
```


https://www.alphavantage.co
