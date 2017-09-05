const express = require('express');
const Controller = require('../controllers/StockController');

const router = express.Router();
const StockController = new Controller();

router.get('/:stock_name/quote', StockController.registerAction(StockController.getQuotes));
router.get('/:stock_name/history', StockController.registerAction(StockController.getHistory));
router.post('/:stock_name/compare', StockController.registerAction(StockController.compareStocks));
router.get('/:stock_name/gains', StockController.registerAction(StockController.projectGains));

module.exports = router;
