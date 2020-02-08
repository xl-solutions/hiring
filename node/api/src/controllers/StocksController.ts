import { Request, Response } from 'express'
import StocksService from '../services/StocksService'
import handleErrors from '../utils/handleErrors'

class StocksController {
  public async recentQuotation(req: Request, res: Response): Promise<Response> {
    try {
      const quotation = await StocksService.fetchRecentQuotation(req.params.stock_name)
      return res.json(quotation)
    } catch (error) {
      const { status, message } = handleErrors(error)
      return res.status(status).json({ message })
    }
  }

  public async historicPriceStocks(req: Request, res: Response): Promise<Response> {
    try {
      const stockName = req.params.stock_name
      const { from, to } = req.query
      const history = await StocksService.fetchHistoricalSharePrice(stockName, from, to)

      return res.json(history)
    } catch (error) {
      const { status, message } = handleErrors(error)
      return res.status(status).json({ message })
    }
  }

  public async compareStocks(req: Request, res: Response): Promise<Response> {
    try {
      const { stock_name: stockName } = req.params
      const { stocks } = req.body
      const comparison = await StocksService.stocksCompare(stockName, stocks)

      return res.json(comparison)
    } catch (error) {
      const { status, message } = handleErrors(error)
      return res.status(status).json({ message })
    }
  }

  public async gains(req: Request, res: Response): Promise<Response> {
    try {
      const stockName = req.params.stock_name
      const { purchasedAmount, purchasedAt } = req.query
      const gains = await StocksService.gains(stockName, purchasedAmount, purchasedAt)

      return res.json(gains)
    } catch (error) {
      const { status, message } = handleErrors(error)
      return res.status(status).json({ message })
    }
  }
}

export default new StocksController()
