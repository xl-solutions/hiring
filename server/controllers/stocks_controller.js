module.exports.quote = (app, req, res) => {
  res.json({ name: "PETR4.SA", lastPrice: 25.11, pricedAt: "2017-06-23T14:15:16Z" })
}

module.exports.history = (app, req, res) => {
  res.json(
    { name: "PETR4.SA",
      prices: [
        { opening: 14.67,
          low: 14.57,
          high: 14.89,
          closing: 14.85,
          pricedAt: '2017-04-04' },
        { opening: 15.05,
          low: 14.50,
          high: 15.16,
          closing: 14.57,
          pricedAt: '2017-04-05' }]})
}

module.exports.compare = (app, req, res) => {

}

module.exports.gains = (app, req, res) => {

}