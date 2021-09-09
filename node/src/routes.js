const { Router } = require("express");
const {
  getStockQuote,
  getStockHistory,
  getStockComparison,
  getStockProgection,
} = require("../src/controllers/stocksController");

const routes = Router();

routes.get("/:stock_name/quote", getStockQuote);
routes.get("/:stock_name/history", getStockHistory);
routes.get("/:stock_name/compare", getStockComparison);
routes.get("/:stock_name/gains", getStockProgection);

module.exports = routes;
