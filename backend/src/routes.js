const { Router } = require('express')
const { getStockByName, getProjectionStock } = require('./controllers/stocks')
const { getHistoryStock } = require('./controllers/stocks')
const { stocksComparation } = require('./controllers/stocks')

const routes = Router()

routes.get("/stocks/:stock_name/quote", getStockByName)
routes.get("/stocks/:stock_name/history", getHistoryStock)
routes.get("/stocks/:stock_name/:stocks/compare", stocksComparation)
routes.get("/stocks/:stock_name/gains", getProjectionStock)


module.exports = routes