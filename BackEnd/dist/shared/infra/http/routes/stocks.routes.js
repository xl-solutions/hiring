"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stocksRouter = void 0;

var _express = require("express");

var _ListCompareStocksController = require("../../../../modules/stocks/useCases/listCompareStocks/ListCompareStocksController");

var _ListHistoricPricesController = require("../../../../modules/stocks/useCases/listHistoricPrices/ListHistoricPricesController");

var _ListProjectGainsController = require("../../../../modules/stocks/useCases/listProjectGains/ListProjectGainsController");

var _ListRecentQuotesController = require("../../../../modules/stocks/useCases/listRecentQuotes/ListRecentQuotesController");

const stocksRouter = (0, _express.Router)();
exports.stocksRouter = stocksRouter;
const listRecentQuotesController = new _ListRecentQuotesController.ListRecentQuotesController();
const listHistoricPricesController = new _ListHistoricPricesController.ListHistoricPricesController();
const listCompareStocksController = new _ListCompareStocksController.ListCompareStocksController();
const listProjectGainsController = new _ListProjectGainsController.ListProjectGainsController();
stocksRouter.get("/:stock_name/quote", listRecentQuotesController.handle);
stocksRouter.get("/:stock_name/history", listHistoricPricesController.handle);
stocksRouter.get("/:stock_name/compare", listCompareStocksController.handle);
stocksRouter.get("/:stock_name/gains", listProjectGainsController.handle);