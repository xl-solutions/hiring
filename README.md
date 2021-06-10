# System Requirements

You must be able to run `npm` commands on the machine.
In both folders (front and node), you need to create a `.env` file, which should be based on `env-sample.env` available in both the `front` and `node` folders.

# How to run

Run the `npm start` command on the root to launch both applications. This command will install some project dependencies, which may take a while.
By default, the ports are as follows:
Front-end: `localhost:3001`
Back-end: `localhost:3002`

## Back-end

To run the `back-end` only, run the `npm start-api` command in the root folder

## Front-end

To run the `front-end` only, run the `npm start-app` command in the root folder

# Tests

There are tests for both the frontend and the backend, and to run them just run the command `npm test`

## Back-end

To run the `back-end` tests only, run the `npm test-api` command in the root folder

## Front-end

To run the `front-end` test only, run the `npm test-app` command in the root folder

# Available endpoints (API)

`GET /stocks/:stock_name/quote` - GET the most recent Quote for a given stock

`GET /stocks/:stock_name/history?from=<string>&to=<string>` - GET the price History for a given stock and date interval

`POST /stocks/:stock_name/compare` - POST to compare the principal stock with one or more stocks

Payload:

```js
{
  "stocks": [<string>, <string>, ...]
}
```

# Extras

If you prefer, there is a folder inside the `node` folder called `layout`, which using the `Visual Stdio Code REST client extension`, it is possible to test the API endpoints if it is running.

If you prefer to change the ports, both can be changed in the `.env` in their respective folders, but don't forget to change the `config.json` file in the `front/src/` folder where the API is consumed.

# Detalhamento
