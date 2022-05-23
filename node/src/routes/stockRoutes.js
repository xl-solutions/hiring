const express = require('express');
const router = express.Router(); 
const stockController = require('../controllers/stockController');

router.get('/:stock_name/quote', stockController.quote);
router.get('/:stock_name/history', stockController.history);
router.get('/:stock_name/compare', stockController.compare);
router.get('/:stock_name/gains', stockController.gains);

module.exports = router; 