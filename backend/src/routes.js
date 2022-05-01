const { Router } = require('express')
const { getStockByName } = require('./controllers/stocks')

const routes = Router()

routes.get("/stocks/:stock_name/quote", getStockByName)

module.exports = routes