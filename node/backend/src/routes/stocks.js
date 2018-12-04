'use strict';

const router = require('express').Router();
const callController = require('../middlewares/callController');
const StocksController = require('../modules/Stocks/StocksController');

router.get('/:stock_name/quote', callController(StocksController, 'quote'));

module.exports = router;
