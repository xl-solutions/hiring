const express = require('express');
const router = express.Router(); 
const mainController = require('../controllers/mainController');
const stockRoutes = require('./stockRoutes');

router.get('/', mainController.index);
router.use('/stocks', stockRoutes);
router.get('/*', mainController.notFound);

module.exports = router; 