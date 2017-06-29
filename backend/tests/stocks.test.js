import request from 'supertest'
import app from '../app'


describe('stock api', () => {
  it('quote', () => {
    return request(app).get('/stocks/PETR4/quote')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(typeof res.body.name).toBe('string')
      expect(typeof res.body.lastPrice).toBe('number')
      expect(typeof res.body.pricedAt).toBe('string')
    })
  })
  it('history', () => {
    return request(app).get('/stocks/PETR4/history?from=2017-04-04&to=2017-04-05')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(typeof res.body.name).toBe('string')
      expect(res.body.prices).toBeInstanceOf(Array)
      expect(res.body.prices.length).toBe(2)
      res.body.prices.map(data => {
        expect(typeof data.opening).toBe('number')
        expect(typeof data.low).toBe('number')
        expect(typeof data.high).toBe('number')
        expect(typeof data.closing).toBe('number')
        expect(typeof data.pricedAt).toBe('string')
      })
    })
  })
  it('compare', () => {
    return request(app).get('/stocks/PETR4,VALE5/compare')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.lastPrice).toBeInstanceOf(Array)
      expect(res.body.lastPrice.length).toBe(2)
      res.body.lastPrice.map(data => {
        expect(typeof data.name).toBe('string')
        expect(typeof data.lastPrice).toBe('number')
        expect(typeof data.pricedAt).toBe('string')
      })
    })
  })
  it('gains', () => {
    return request(app).get('/stocks/USIM5/gains?purchasedAmount=100&purchasedAt=2016-05-31')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      const purchasedAmount = res.body.purchasedAmount
      const total = ((purchasedAmount * res.body.lastPrice) - (purchasedAmount * res.body.priceAtDate))
      expect(typeof res.body.name).toBe('string')
      expect(typeof res.body.purchasedAmount).toBe('number')
      expect(typeof res.body.priceAtDate).toBe('number')
      expect(typeof res.body.lastPrice).toBe('number')
      expect(typeof res.body.capitalGains).toBe('number')
      expect(res.body.capitalGains).toBe(total)
    })    
  })
})