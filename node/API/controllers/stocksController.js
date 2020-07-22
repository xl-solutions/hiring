const express = require('express')
const router = express.Router();
const api = require("../services/AlphaApi")




module.exports = app => app.use('/stocks', router)