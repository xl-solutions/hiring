let
  googleFinance = require('google-finance'),
  moment = require('moment')

module.exports.quote = (app, req, res) => {
  googleFinance.historical({
    symbol: req.params.stock_name,
    //Get the last five days. Because some days, like sunday, no has cotation
    from: moment().subtract(5, 'days').format('YYYY-MM-DD'),
  }, (err, quotes) => {
    if (err || quotes.length < 1)
      res.sendStatus(404)
    else {
      let quote = quotes.pop()
      res.json({
        name: quote.symbol,
        lastPrice: quote.close,
        pricedAt: quote.date
      })
    }
  })
}

module.exports.history = (app, req, res) => {
  googleFinance.historical({
    symbol: req.params.stock_name,
    from: new Date(req.query.from),
    to: new Date(req.query.to)
  }, (err, quotes) => {
    if (err || quotes.length < 1)
      res.sendStatus(404)
    else {
      let result = []

      quotes.forEach((quote) => {
        result.push({
          opening: quote.open,
          low: quote.low,
          high: quote.high,
          closing: quote.close,
          pricedAt: quote.date
        })
      })

      res.json({name: quotes[0].symbol, prices: result})
    }
  })
}

module.exports.compare = (app, req, res) => {
  let stocks = req.params.stock_name.replace(' ', '')
  stocks = stocks.split(',')

  if (stocks.length < 2)
    res.status(400).send({error: 'Send more then one symbol!'})

  googleFinance.historical({
    symbols: stocks,
    //Get the last five days. Because some days, like sunday, no has cotation
    from: moment().subtract(5, 'days').format('YYYY-MM-DD'),
  }, (err, quotes) => {
    if (err || quotes.length < 2)
      res.sendStatus(404)

    prices = []

    for (let key in quotes) {
      let last = quotes[key].pop()
      prices.push({
        name: last.symbol,
        lastPrice: last.close,
        pricedAt: last.date
      })
    }

    res.json({lastPrices: prices})
  })
}

module.exports.gains = (app, req, res) => {
  googleFinance.historical({
    symbol: req.params.stock_name,
    from: new Date(req.query.purchasedAt),
    to: moment().format('YYYY-MM-DD')
  }, (err, quotes) => {
    if (err || quotes.length < 1)
      res.sendStatus(404)
    else {
      let amount = parseInt(req.query.purchasedAmount)

      let first = quotes[0]
      let last = quotes.pop()

      res.json({
        name: last.symbol,
        purchasedAmount: amount,
        purchasedAt: first.date,
        priceAtDate: first.close,
        lastPrice: last.close,
        capitalGains: ((amount * last.close) - (amount * first.close))
      })
    }
  })
}