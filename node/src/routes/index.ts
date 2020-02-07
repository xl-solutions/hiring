import { Router } from 'express'
import StocksController from '../controllers/StocksController'
import historyValidator from '../validators/history'
import compareValidator from '../validators/compare'

const router = Router()

router.get('/stocks/:stock_name/quote', StocksController.recentQuotation)
router.get('/stocks/:stock_name/history', historyValidator, StocksController.historicPriceStocks)
router.post('/stocks/:stock_name/compare', compareValidator, StocksController.compareStocks)
router.get('/stocks/:stock_name/gains', StocksController.earnings)

export default router
