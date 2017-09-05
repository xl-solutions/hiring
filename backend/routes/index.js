const express = require('express');

const router = express.Router();

// register routes groups
router.use('/stocks', require('./stocks'));

module.exports = router;
