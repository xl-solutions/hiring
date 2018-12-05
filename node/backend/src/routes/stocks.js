'use strict';

const router = require('express').Router();
const callController = require('../middlewares/callController');
const StocksController = require('../modules/Stocks/StocksController');

router.get('/:stock_name/quote', callController(StocksController, 'quote'));
router.get('/:stock_name/history', callController(StocksController, 'history'));
router.post('/:stock_name/compare', callController(StocksController, 'compare'));
router.get('/:stock_name/gains', callController(StocksController, 'gains'));

module.exports = router;
