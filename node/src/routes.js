const { Router } = require("express");
const { getStockQuote, getStockHistory } = require("../src/controllers/stocksController");

const routes = Router();

routes.get("/:stock_name/quote", getStockQuote);
routes.get("/:stock_name/history", getStockHistory);

module.exports = routes;
