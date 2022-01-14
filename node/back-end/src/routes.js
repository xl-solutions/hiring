const { Router } = require('express')
const {
    getStocks,
    getHistoryStock,
    getComparisonStock,
    getProjectionStock
} = require('../src/controllers/stocksController')

const routes = Router()

routes.get("/stocks/:stock_name/quote", getStocks)
routes.get("/stocks/:stock_name/history", getHistoryStock)
routes.get("/stocks/:stock_name/:stocks/compare", getComparisonStock)
routes.get("/stocks/:stock_name/gains", getProjectionStock)

module.exports = routes