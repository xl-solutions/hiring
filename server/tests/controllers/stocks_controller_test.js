let
  app = require('./../../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  moment = require('moment')

chai.use(chaiHttp)

const
  stock_name = 'PETR4.SA',
  stocks_array = 'PETR4.SA,VALE5.SA',
  historyFrom = '2018-01-01',
  historyTo = '2018-01-02'
  purchasedAmount = '100'
  purchasedAt = '2018-01-01'


let expect = chai.expect

/**
 * Check data is in ISO 8601 format
 * */
let isDateISO8601 = (date) => {
  return moment(date, moment.ISO_8601, true).isValid()
}

/**
 * The response of this request has a return like this json object
 * { "name": "PETR4.SA", "lastPrice": 25.11, "pricedAt": "2017-06-23T14:15:16Z" }
 * */
describe('Test in stocks_controller', () => {
  it('Test route /stocks/:stock_name/quote', (done) => {
    chai.request(app)
      .get('/stocks/' + stock_name + '/quote')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).have.all.keys('name', 'lastPrice', 'pricedAt')
        expect(res.body.name).to.be.a('string')
        expect(res.body.lastPrice).to.be.a('number')
        expect(res.body.pricedAt).to.be.a('string')

        expect(isDateISO8601(res.body.pricedAt)).to.equal(true)

        done()
      })
  })

  it('Test route /stocks/:stock_name/history', (done) => {
    chai.request(app)
      .get('/stocks/' + stock_name + '/history?from=<' + historyFrom + '>&to=<' + historyTo + '>')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).have.all.keys('name', 'prices')
        expect(res.body.name).to.be.a('string')
        expect(res.body.prices).to.be.an('array')

        res.body.prices.forEach((price) => {
          expect(price).have.all.keys('opening', 'low', 'high', 'closing' ,'pricedAt')
          expect(price.opening).to.be.a('number')
          expect(price.low).to.be.a('number')
          expect(price.high).to.be.a('number')
          expect(price.closing).to.be.a('number')
          expect(price.pricedAt).to.be.a('string')

          expect(isDateISO8601(price.pricedAt)).to.equal(true)
        })

        done()
      })
  })

  it('Test route /stocks/:stock_name/compare', (done) => {
    chai.request(app)
      .get('/stocks/' + stocks_array + '/compare')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body.lastPrices).to.be.an('array')

        res.body.lastPrices.forEach((price) => {
          expect(price).have.all.keys('name', 'lastPrice', 'pricedAt')
          expect(price.name).to.be.a('string')
          expect(price.lastPrice).to.be.a('number')
          expect(price.pricedAt).to.be.a('string')

          expect(isDateISO8601(price.pricedAt)).to.equal(true)
        })

        done()
      })
  })

  it('Test route /stocks/:stock_name/gains', (done) => {
    chai.request(app)
      .get('/stocks/' + stock_name + '/gains?purchasedAmount=<' + purchasedAmount + '>&purchasedAt=<' + purchasedAt + '>')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
        expect(res.body).have.all.keys('name', 'purchasedAmount', 'purchasedAt', 'priceAtDate', 'lastPrice', 'capitalGains')
        expect(res.body.name).to.be.a('string')
        expect(res.body.purchasedAmount).to.be.a('number')
        expect(res.body.purchasedAt).to.be.a('string')
        expect(res.body.priceAtDate).to.be.a('number')
        expect(res.body.lastPrice).to.be.a('number')
        expect(res.body.capitalGains).to.be.a('number')

        expect(isDateISO8601(res.body.purchasedAt)).to.equal(true)

        done()
      })
  })
})