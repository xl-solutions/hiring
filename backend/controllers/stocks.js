import googleFinance from 'google-finance'
import {date} from '../helpers'

export default {
  quote: (req, res) => {
    googleFinance.historical({
      symbol: req.params.stock_name.indexOf(':') > -1 ? req.params.stock_name : `BVMF:${req.params.stock_name}`,
      from: date()
    })
    .then(result => {
      const {symbol, close, date} = result[0]
      res.json({
        name: symbol,
        lastPrice: close,
        pricedAt: date
      })
    })
    .catch(() => res.sendStatus(404))
  },
  history: (req, res) => {
    googleFinance.historical({
      symbol: req.params.stock_name.indexOf(':') > -1 ? req.params.stock_name : `BVMF:${req.params.stock_name}`,
      from: req.query.from,
      to: req.query.to
    })
    .then(result => {
      let name = null
      const prices = result.map(price => {
        const {date, low, high, close, open, symbol} = price
        name = symbol
        return {
          opening: open,
          low,
          high,
          pricedAt: date,
          closing: close
        }
      })
      res.json({
        name,
        prices
      })
    })
    .catch(() => res.sendStatus(404))
  },
  compare: (req, res) => {
    const symbols = req.params.stock_name.split(',')
    googleFinance.historical({
      symbols: symbols,
      from: date()
    })
    .then(result => {
      const data = symbols.map(value => {
        return result[value][0]
      }).map(value => {
        const {date, close, symbol} = value
        return {
          name: symbol,
          lastPrice: close,
          pricedAt: date
        }
      })
      res.json({
        lastPrice: data
      })
    })
    .catch(() => res.sendStatus(404))
  },
  gains: (req, res) => {
    const {purchasedAmount, purchasedAt} = req.query
    googleFinance.historical({
      symbol: req.params.stock_name.indexOf(':') > -1 ? req.params.stock_name : `BVMF:${req.params.stock_name}`,
      from: purchasedAt,
      to: date()
    })
    .then(result => {
      const {symbol, close} = result[0]
      const {close: closeLast} = result[result.length - 1]
      res.json({
        name: symbol,
        purchasedAmount: parseInt(purchasedAmount),
        priceAtDate: close,
        lastPrice: closeLast,
        capitalGains: ((purchasedAmount * closeLast) - (purchasedAmount * close))
      })
    })
    .catch(() => res.sendStatus(404))
  }
}
