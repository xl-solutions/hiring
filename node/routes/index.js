require('dotenv').config()
const Joi = require('@hapi/joi');
const express = require('express');
const helmet = require('helmet');
var cors = require('cors')

const stockController = require('../controllers/StockController');
const validateWith = require('../validator/validator');
const schemaConfig = require('../validator/config');

const app = express();
const Stocks = new stockController();
const config = new schemaConfig();
app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(cors())


app.get('/stocks/:stock_name/quote', validateWith(config.quote()), (req, res) => {
    return Stocks.getQuotes(req, res)
})

app.get('/stocks/:stock_name/history', validateWith(config.history()), (req, res) => {
    return Stocks.getHistory(req, res)
})

app.post('/stocks/:stock_name/compare', validateWith(config.compare()), (req, res) => {
    return Stocks.getCompared(req, res)
})

app.get('/stocks/:stock_name/gains', validateWith(config.gains()), (req, res) => {
    return Stocks.getGains(req, res)
})

module.exports = app;
