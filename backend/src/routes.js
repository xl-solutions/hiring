const { Router } = require("express");
const {
    getStockByName,
    getProjectionStock,
    getHistoryStock,
    stocksComparation,
    addStockAtPortfolio,
    getStockAtPortfolio,
} = require("./controllers/stocks");

const routes = Router();
routes.post("/stocks/add", addStockAtPortfolio);
routes.get("/stocks/:stock_name/quote", getStockByName);
routes.get("/stocks/my", getStockAtPortfolio);
routes.get("/stocks/:stock_name/history", getHistoryStock);
routes.get("/stocks/:stock_name/:stocks/compare", stocksComparation);
routes.get("/stocks/:stock_name/gains", getProjectionStock);

module.exports = routes;