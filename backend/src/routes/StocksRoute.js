import express from 'express';
import requestGet from '../services/StocksService.js';

const router = express.Router()

router.get('/:stock_name/gains', function (req, res) {
  const stockName = req.params.stock_name;
  const { query: { purchasedAmount, purchasedAt } } = req;
  try {
    const response = stockName;
    requestGet();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});


export default router;