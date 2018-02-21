import { mount } from 'vue-test-utils'
import chai from 'chai'
import Gains from '../../../src/components/pages/stocks/Gains'
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

describe('Gains.vue', () => {
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

    let gains = mount(Gains)

    expect(gains.vm.options).to.deep.equal([{label: symbol, value: symbol}])
  })

  it('Test in http request', (done) => {
    const response = {
      name: symbol,
      purchasedAmount: 100,
      purchasedAt: '2016-05-31',
      priceAtDate: 3.97,
      lastPrice: 4.33,
      capitalGains: 36.0
    }

    let gains = mount(Gains)

    gains.vm.$http = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    })

    gains.setData({
      search: {
        symbol: response.name,
        purchasedAmount: response.purchasedAmount,
        purchasedAt: response.purchasedAt
      }
    })

    moxios.stubRequest(
      baseUrl + 'stocks/' + gains.vm.search.symbol +
      '/gains?purchasedAmount=' + gains.vm.search.purchasedAmount +
      '&purchasedAt=' + gains.vm.search.purchasedAt, {
        status: 200,
        response: response
      })

    gains.vm.getGains()

    moxios.wait(() => {
      expect(gains.vm.stock).to.be.an('object')
      expect(gains.vm.stock).to.deep.equal(response)

      done()
    })
  })

  it('Test http error request', (done) => {
    const errorResponse = {errors: {stock_name: ['Symbol not found!']}}
    let gains = mount(Gains)

    gains.vm.$http = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    })

    gains.setData({search: {symbol: '', purchasedAmount: '', purchasedAt: ''}})

    moxios.stubRequest(
      baseUrl + 'stocks/' + gains.vm.search.symbol +
      '/gains?purchasedAmount=' + gains.vm.search.purchasedAmount +
      '&purchasedAt=' + gains.vm.search.purchasedAt, {
        status: 200,
        response: errorResponse
      })

    gains.vm.getGains()

    moxios.wait(() => {
      expect(gains.vm.message).to.not.equal('')
      expect(gains.vm.stock).to.deep.equal({})

      done()
    })
  })
})
