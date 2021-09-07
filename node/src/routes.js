const { Router } = require("express");
const { getStockQuote } = require("../src/controllers/stocksController");

const routes = Router();

routes.get("/:stock_name/quote", getStockQuote);

module.exports = routes;
