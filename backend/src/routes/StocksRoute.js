import express from "express";
import gainsProjection from "../services/GainsProjection.js";
import recentQuote from "../services/RecentQuote.js";
import compareQuotes from "../services/CompareQuotes.js";
import stockHistory from "../services/StockHistory.js";
import getStockCurrency from "../services/GetStockCurrency.js";
import requestGet from "../services/StocksService.js";

const router = express.Router()

// Gains projection by specific date
router.get("/:stock_name/gains", async (req, res) => {
  const stockName = req.params.stock_name;
  const { query } = req;
  const stockFunction = "TIME_SERIES_MONTHLY";
  const stockInterval = "5min";
  try {
    const { stockSymbol, currency } = await getStockCurrency(stockName);
    const response = await requestGet(stockFunction, stockSymbol, stockInterval);
    const informationData = response[Object.keys(response)[0]];
    const stockData = response[Object.keys(response)[1]];
    const gainsResult = await gainsProjection(query, stockSymbol, stockData, informationData, currency);
    res.status(200).json(gainsResult);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Returns the most recent quote for stock
router.get("/:stock_name/quote", async (req, res) => {
  const stockName = req.params.stock_name;
  const stockFunction = "GLOBAL_QUOTE";
  const stockInterval = "5min";
  try {
    const { stockSymbol, currency } = await getStockCurrency(stockName);
    const response = await requestGet(stockFunction, stockSymbol, stockInterval);
    const informationData = response[Object.keys(response)[0]];
    const quoteResult = await recentQuote(stockSymbol, informationData, currency);
    res.status(200).json(quoteResult);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Compare two or more stocks
router.post("/:stock_name/compare", async (req, res) => {
  const stockName = req.params.stock_name;
  const stockNamesArray = req.body.stocks;
  stockNamesArray.unshift(stockName);
  const stockFunction = "GLOBAL_QUOTE";
  const stockInterval = "5min";
  try {
    const response = await compareQuotes(stockNamesArray, stockFunction, stockInterval);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Returns history stock prices
router.get("/:stock_name/history", async (req, res) => {
  const stockName = req.params.stock_name;
  const { from, to } = req.query;
  const stockFunction = "TIME_SERIES_MONTHLY";
  const stockInterval = "5min";
  try {
    const { stockSymbol, currency } = await getStockCurrency(stockName);
    const response = await requestGet(stockFunction, stockSymbol, stockInterval);
    const stockData = response[Object.keys(response)[1]];
    const resultHistory = await stockHistory(stockSymbol, stockData, from, to, currency);
    res.status(200).json(resultHistory);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;