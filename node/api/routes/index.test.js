const request = require('supertest')
const app = require('../server')

describe('Test Endpoints', () => {
 
  it('isAlive - should return 200 when server alive', async () => {
    const res = await request(app)
      .get('/isAlive')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Server Alive')
  })

  it('search - should return some ticker for similar stockname', async () => {
    const res = await request(app)
      .get('/stocks/IBM/search')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)).toHaveProperty('bestMatches')
  })

  it('search- should return some empty for no similar stockname', async () => {
    const res = await request(app)
      .get('/stocks/sssssssssssssss/search')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)).toHaveProperty('bestMatches')
    expect(JSON.parse(res.text)['bestMatches']).toEqual([])
  })

  it('search - should return 404 Error message for empty stockname', async () => {
    const res = await request(app)
      .get('/stocks//search')
    expect(res.statusCode).toEqual(404)
    expect(res.text).toEqual('404! This is an invalid URL.')
  })

  it('quote - should return recent quote for a valid stockname', async () => {
    const res = await request(app)
      .get('/stocks/IBM/quote')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)).toHaveProperty('name')
    expect(JSON.parse(res.text)).toHaveProperty('lastPrice')
    expect(JSON.parse(res.text)).toHaveProperty('pricedAt')
  })

  it('quote - should return error message for invalid stockname', async () => {
    const res = await request(app)
      .get('/stocks/fsafsaf/quote')
    expect(res.statusCode).toEqual(500)
    expect(res.text).toEqual('Stock exists?')
  })

  it('quote - should return 404 message for null stockname', async () => {
    const res = await request(app)
      .get('/stocks//quote')
    expect(res.statusCode).toEqual(404)
    expect(res.text).toEqual('404! This is an invalid URL.')
  })

  it('history - should return history quote for a valid stockname', async () => {
    const res = await request(app)
      .get('/stocks/IBM/history?from=2021-09-19&to=2021-09-25')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)).toHaveLength(5)
  })

  it('history - should return history quote for a valid stockname', async () => {
    const data= {stocks: ["AADI","IBM"]}
    const res = await request(app)
      .post('/stocks/TSLA/compare')
      .send(data)
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)).toHaveProperty('lastPrices')
    expect(JSON.parse(res.text)['lastPrices']).toHaveLength(3)
  })

})
