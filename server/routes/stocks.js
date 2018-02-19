module.exports = (app) => {
  app.get('/stocks/:stock_name/quote', (req, res) => {
    app.controllers.stocks_controller.quote(app, req, res )
  })

  app.get('/stocks/:stock_name/history', (req, res) => {
    app.controllers.stocks_controller.history(app, req, res )
  })

  app.get('/stocks/:stock_name/compare', (req, res) => {
    app.controllers.stocks_controller.compare(app, req, res )
  })

  app.get('/stocks/:stock_name/gains', (req, res) => {
    app.controllers.stocks_controller.gains(app, req, res )
  })
}