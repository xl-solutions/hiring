const express = require('express');
const router = express.Router();
const StocksController = require('../src/controllers/StocksController');

router.get('/stocks/:stock_name/quote', StocksController.quote);
router.get('/stocks/:stock_name/history', StocksController.history);
router.get('/stocks/:stock_name/gains', StocksController.gains);
router.post('/stocks/:stock_name/compare', StocksController.compare);

module.exports = router;