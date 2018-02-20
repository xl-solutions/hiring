let
  googleFinance = require('google-finance'),
  moment = require('moment'),
  validate = require("validate.js")

validate.extend(validate.validators.datetime, {
  parse: (value) => {
    return +moment(value).utc()
  },
  format: (value) => {
    return moment(value).utc().format('YYYY-MM-DD')
  }
})


const historyValidade = {
  from: {
    presence: {
      allowEmpty: false
    },
    datetime: true
  },
  to: {
    presence: {
      allowEmpty: false
    },
    datetime: true
  }
}

module.exports.quote = (app, req, res) => {
  googleFinance.historical({
    symbol: req.params.stock_name,
    //Get the last five days. Because some days, like sunday, no has cotation
    from: moment().subtract(5, 'days').format('YYYY-MM-DD'),
  }, (err, quotes) => {
    if (err || quotes.length < 1) {
      res.json({errors: {stock_name: ['Symbol not found!']}})
    }
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
  let errors = validate(req.query, historyValidade)

  if (errors) {
    res.json({errors: errors})
  }
  else {
    if (moment(req.query.from) >= moment(req.query.to)) {
      res.json({errors: {from: ['From must be less than To']}})
    }
    else if (moment(req.query.to) > moment()) {
      res.json({errors: {from: ['To must be less or equal the current date']}})
    }
    else {
      googleFinance.historical({
        symbol: req.params.stock_name,
        from: new Date(req.query.from),
        to: new Date(req.query.to)
      }, (err, quotes) => {
        if (err || quotes.length < 1) {
          res.json({errors: {stock_name: ['Symbol not found!']}})
        }
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

          res.json({name: quotes[0].symbol, lastPrices: result})
        }
      })
    }
  }
}

module.exports.compare = (app, req, res) => {
  let stocks = req.params.stock_name.replace(' ', '')
  stocks = stocks.split(',')

  if (stocks.length < 2) {
    res.json({errors: {stock_name: ['Send more then one stock symbol']}})
  }
  else {
    googleFinance.historical({
      symbols: stocks,
      //Get the last five days. Because some days, like sunday, no has cotation
      from: moment().subtract(5, 'days').format('YYYY-MM-DD'),
    }, (err, quotes) => {
      if (err || quotes.length < 2) {
        res.json({errors: {stock_name: ['Symbols not found!']}})
      }
      else {
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
      }
    })
  }
}

module.exports.gains = (app, req, res) => {
  googleFinance.historical({
    symbol: req.params.stock_name,
    from: new Date(req.query.purchasedAt),
  }, (err, quotes) => {
    if (err || quotes.length < 1) {
      res.json({errors: {stock_name: ['Symbol not found!']}})
    }
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