import { Router } from 'express'

import StocksController from '../controllers/StocksController'
import {
  history as historyValidator,
  compare as compareValidator,
  gains as gainsValidator
} from '../validators/stocks'

const router = Router()

router.get('/stocks/:stock_name/quote', StocksController.recentQuotation)
router.get('/stocks/:stock_name/history', historyValidator, StocksController.historicPriceStocks)
router.post('/stocks/:stock_name/compare', compareValidator, StocksController.compareStocks)
router.get('/stocks/:stock_name/gains', gainsValidator, StocksController.gains)

export default router
