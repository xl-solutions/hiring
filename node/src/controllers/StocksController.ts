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
    return res.json({
      name: 'string',
      prices: []
    })
  }

  public async compareStocks(req: Request, res: Response): Promise<Response> {
    return res.json({
      lastPrices: [{
        name: 'string',
        lastPrice: 'number',
        priceAt: 'string'
      }]
    })
  }

  public async earnings(req: Request, res: Response): Promise<Response> {
    return res.json({
      ame: 'string',
      urchasedAmount: 'number',
      urchasedAt: 'string',
      riceAtDate: 'number',
      astPrice: 'number',
      apitalGains: 'number'
    })
  }
}

export default new StocksController()
