import { mount } from 'vue-test-utils'
import chai from 'chai'
import Portfolio from '../../../src/components/pages/stocks/Portfolio'
import axios from 'axios'
import moxios from 'moxios'
import { LocalStorage } from 'quasar'

describe('Portfolio.vue', () => {
  const expect = chai.expect
  const baseUrl = 'http://localhost:3000/'

  let portfolio

  beforeEach(() => {
    LocalStorage.clear()

    moxios.install()
    portfolio = mount(Portfolio)

    portfolio.vm.$http = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Test in http request and localStorage on reload component', (done) => {
    const symbol = 'NASDAQ:AAPL'
    const response = { name: symbol, lastPrice: 25.11, pricedAt: '2017-06-23T14:15:16Z' }

    portfolio.setData({symbol: symbol})

    moxios.stubRequest(baseUrl + 'stocks/' + symbol + '/quote', {
      status: 200,
      response: response
    })

    portfolio.vm.getStock()

    moxios.wait(() => {
      expect(portfolio.vm.stocks).to.deep.equal([response])
      portfolio = mount(Portfolio)
      expect(portfolio.vm.stocks).to.deep.equal(LocalStorage.get.item('stocks'))

      done()
    })
  })

  it('Test in http request with error', (done) => {
    const errorResponse = {errors: {stock_name: ['Symbol not found!']}}

    portfolio.setData({symbol: ''})

    moxios.stubRequest(baseUrl + 'stocks//quote', {
      status: 200,
      response: errorResponse
    })

    portfolio.vm.getStock()

    moxios.wait(() => {
      expect(portfolio.vm.message).to.not.equal('')
      done()
    })
  })
})
