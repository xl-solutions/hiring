const express = require('express');
const router = express.Router();
const LastPriceController = require('../controllers/LastPriceController');
const HistoryController = require('../controllers/HistoryController');
const CompareController = require('../controllers/CompareController');
const PurchaseController = require('../controllers/PurchaseController');

router.get('/stocks/:stock_name/quote', LastPriceController.getLastPrice);
router.get('/stocks/:stock_name/history', HistoryController.getHistory);
router.post('/stocks/:stock_name/compare', CompareController.getCompare);
router.get('/stocks/:stock_name/gains', PurchaseController.getPurchase);

module.exports = router;
