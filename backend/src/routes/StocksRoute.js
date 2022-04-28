import express from "express";
import gainsProjection from "../services/GainsProjection.js";
import requestGet from "../services/StocksService.js";

const router = express.Router()

router.get("/:stock_name/gains", async (req, res) => {
  const stockName = req.params.stock_name;
  const { query } = req;
  const stockFunction = "TIME_SERIES_MONTHLY";
  const stockInterval = "5min";
  try {
    const response = await requestGet(stockFunction, stockName, stockInterval);
    const informationData = response[Object.keys(response)[0]];
    const stockData = response[Object.keys(response)[1]];
    const gainsResult = gainsProjection(query, stockName, stockData, informationData);
    res.status(200).json(gainsResult);
  } catch (error) {
    res.status(400).send(error);
  }
});


export default router;