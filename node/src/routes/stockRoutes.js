const express = require('express');
const router = express.Router(); 
const stockController = require('../controllers/stockController');

router.get('/:stock_name/quote', stockController.quote);
router.get('/:stock_name/history', stockController.history);

module.exports = router; 