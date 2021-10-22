const express = require('express');
router = express.Router();
const Request = require('../domain/Requests');

var path = require('path');

/////////////////////
/* Route           */
/////////////////////

// middleware de log de data da consulta 
router.use(function timeLog(req, res, next) {
  var fullTime = new Date().toLocaleTimeString('en-US')
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  console.log('Time: ', day,'/', month,'/', year, fullTime, req.method, req.url );
  next();
});

// verificar se o servidor está online 
router.get('/isAlive', function(req, res) {
  res.status(200).send('Server Alive');
});

// procura o ticker de uma ação 
router.get('/stocks/:stock_name/search', function(req, res) {
  const params= req.params

  Request.search(params)
  .then(e => 
    res.status(200).send(e)
  )
  .catch(err => {
    res.status(500).send(err.message);
  });
})

// `/stocks/:stock_name/quote` - Retorna a cotação mais recente para a ação ####
router.get('/stocks/:stock_name/quote', function(req, res) {
  const params= req.params

  Request.recent(params)
  .then(e => 
    res.status(200).send(e)
  )
  .catch(err => {
    res.status(500).send(err.message);
  });
})

// `/stocks/:stock_name/history?from=<string>&to=<string>` - Retorna preço histórico da ação 
router.get('/stocks/:stock_name/history', function(req, res) {
  const params= req.params
  
  Request.getHistPrice(params).then(
    (ans)=> 
      res.status(200).send(ans)
  )
  .catch(err => {
    res.status(500).send(err.message);
  });

});

// `/stocks/:stock_name/compare` - Compara uma ação com uma ou mais ações
router.get('/stocks/:stock_name/compare', function(req, res) {
  const {
    stocks,
  } = req.body

  const {
    stock_name,
  } = req.params

  let uri = `/query?function=TIME_SERIES_INTRADAY_EXTENDED&`
  uri+= `symbol=${stock_name}&`
  uri+= `interval=5min&`
  uri+= `slice=year1month1&`
  uri+= `apikey=${process.env.ALPHA_API_KEY}`;
  
  Request.getHistPrice().then(
    (ans)=> 
      res.status(200).send(ans)
  )
  res.status(505)
});

// `/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Projeta 
router.get('/stocks/:stock_name/gains', function(req, res) {
  alphaController.getProjectStock(req, res).then(
    (ans)=> 
      res.status(200).send(ans)
  )
  res.status(505)
});


// For invalid routes MUST be last function 
router.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

module.exports = router;