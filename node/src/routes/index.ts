import { Router } from 'express'
import StocksController from '../controllers/StocksController'

const router = Router()

router.get('/stocks/:stock_name/quote', StocksController.recentQuotation)
router.get('/stocks/:stock_name/history', StocksController.historicPriceStocks)
router.get('/stocks/:stock_name/compare', StocksController.compareStocks)
router.get('/stocks/:stock_name/gains', StocksController.earnings)

export default router
