const express = require('express');
const routes = express.Router();
const api = require('./src/alphavantage')


//Stocks Quotes
routes.get('/stocks/:stock_name/quote', api.getQuoteStock);

//Stocks Historys - Organize ideas and organize the data:
// Query params - from & to ;
routes.get('/stocks/:stock_name/history', api.getTimeSeriesStock);

// Compare Stocks
routes.post('/stocks/:stock_name/compare', api.getCompareStocks);

//Projetar Ganhos
routes.get('/stocks/:stock_name/gains', api.getGainProjection);


module.exports = routes;

