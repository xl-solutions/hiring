const { Router } = require('express')
const { getStocks } = require('./controllers/stocks')

const routes = Router()

routes.get("/stocks/:stock_name/quote", getStocks)

module.exports = routes