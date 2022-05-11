const express = require('express');
const routes = express.Router();

// Criar -> const StocksMiddleware = require('./middlewares/StocksMiddleware');

const stocksQuoteController = require('./controller/stocks/quote-controller');
const stocksHistoryController = require('./controller/stocks/history-controller');

routes.get('/stocks/:stock_name/quote', stocksQuoteController.quote);

routes.get('/stocks/:stock_name/history', stocksHistoryController.history);

// routes.get(
//   '/stocks/:stock_name/history?from=<string>&to=<string>', stocksHistoryController.history,
// );

// Criar -> ('/stocks/:stock_name/compare')

// Criar -> ('/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>')

module.exports = routes;
