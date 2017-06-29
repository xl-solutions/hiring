import express from 'express'
import stocks from '../controllers/stocks'

const router = express.Router()

router.get('/:stock_name/quote', stocks.quote)
router.get('/:stock_name/history', stocks.history)
router.get('/:stock_name/compare', stocks.compare)
router.get('/:stock_name/gains', stocks.gains)

export default router
