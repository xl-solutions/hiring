import { mount } from 'vue-test-utils'
import expect from 'expect'
import Portfolio from '../../../src/components/pages/stocks/Portfolio'
import axios from 'axios'
import moxios from 'moxios'
import { LocalStorage } from 'quasar'

describe('Portfolio.vue', () => {
  let portfolio

  beforeEach(() => {
    LocalStorage.clear()

    moxios.install()
    portfolio = mount(Portfolio)

    portfolio.vm.$http = axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 5000
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Test in http request and localStorage on reload component', (done) => {
    const response = { name: 'NASDAQ:AAPL', lastPrice: 25.11, pricedAt: '2017-06-23T14:15:16Z' }

    portfolio.setData({symbol: 'NASDAQ:AAPL'})

    moxios.stubRequest('http://localhost:3000/stocks/NASDAQ:AAPL/quote', {
      status: 200,
      response: response
    })

    portfolio.vm.getStock()

    moxios.wait(() => {
      expect(portfolio.vm.stocks).toEqual([response])
      portfolio = mount(Portfolio)
      expect(portfolio.vm.stocks).toEqual(LocalStorage.get.item('stocks'))

      done()
    })
  })
})
