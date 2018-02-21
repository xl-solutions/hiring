import { mount } from 'vue-test-utils'
import chai from 'chai'
import History from '../../../src/components/pages/stocks/History'
import axios from 'axios'
import moxios from 'moxios'
import { LocalStorage } from 'quasar'

const baseUrl = 'http://localhost:3000/'
const symbol = 'NASDAQ:AAPL'

let createStocksStorage = () => {
  LocalStorage.set('stocks', [{
    name: symbol,
    lastPrice: 25.11,
    pricedAt: '2017-06-23T14:15:16Z' }])
}

describe('History.vue', () => {
  const expect = chai.expect

  beforeEach(() => {
    LocalStorage.clear()

    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Test load stocks on localStorage', () => {
    createStocksStorage()

    let history = mount(History)

    expect(history.vm.options).to.deep.equal([{label: symbol, value: symbol}])
  })

  it('Test in http request', (done) => {
    const response = {
      name: symbol,
      lastPrices: [
        {opening: 14.67, low: 14.57, high: 14.89, closing: 14.85, pricedAt: '2018-02-12'},
        {opening: 15.05, low: 14.50, high: 15.16, closing: 14.57, pricedAt: '2018-02-13'}
      ]
    }

    let history = mount(History)

    history.vm.$http = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    })

    history.setData({
      search: {
        symbol: symbol,
        from: '2018-02-12',
        to: '2018-02-13'
      }
    })

    moxios.stubRequest(
      baseUrl + 'stocks/' + history.vm.search.symbol +
      '/history?from=' + history.vm.search.from +
      '&to=' + history.vm.search.to, {
        status: 200,
        response: response
      })

    history.vm.getHistory()

    moxios.wait(() => {
      expect(history.vm.lastPrices).to.be.an('array')
      expect(history.vm.lastPrices).to.deep.equal(response.lastPrices)

      done()
    })
  })

  it('Test http error request', (done) => {
    const errorResponse = {errors: {stock_name: ['Symbol not found!']}}
    let history = mount(History)

    history.vm.$http = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    })

    history.setData({search: {symbol: '', from: '', to: ''}})

    moxios.stubRequest(
      baseUrl + 'stocks/' + history.vm.search.symbol +
      '/history?from=' + history.vm.search.from +
      '&to=' + history.vm.search.to, {
        status: 200,
        response: errorResponse
      })

    history.vm.getHistory()

    moxios.wait(() => {
      expect(history.vm.message).to.not.equal('')
      expect(history.vm.lastPrices).to.deep.equal([])

      done()
    })
  })
})
