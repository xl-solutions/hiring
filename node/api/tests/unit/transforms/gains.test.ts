import StocksService from '../../../src/services/StocksService'
import gainsTransform from '../../../src/transforms/gains'
import quotationsMock from '../../mocks/gains'
import dateUtils from '../../../src/utils/date'

describe('GAINS TRANSFORM', () => {
  const stockName = 'PETR4.SA'
  const purchasedAmount = 50
  const purchasedAt = '2020-01-01'

  it('successful get today quotation', () => {
    const quotationToday = StocksService.getQuotationOn(quotationsMock, dateUtils.toISODate())

    expect(quotationToday).toStrictEqual({
      '1. open': '29.0000',
      '2. high': '29.3500',
      '3. low': '28.7300',
      '4. close': '29.1200',
      '5. volume': '42535200'
    })
  })

  it('successful get quotation on purchased day', () => {
    const quotationOnPurchasedDay = StocksService.getQuotationOn(quotationsMock, purchasedAt)

    expect(quotationOnPurchasedDay).toStrictEqual({
      '1. open': '30.5500',
      '2. high': '30.7100',
      '3. low': '30.2000',
      '4. close': '30.2100',
      '5. volume': '12785500'
    })
  })

  it('successful calculate gains', () => {
    const quotationToday = StocksService.getQuotationOn(quotationsMock, dateUtils.toISODate())
    const quotationOnPurchasedDay = StocksService.getQuotationOn(quotationsMock, purchasedAt)
    const capitalGains = StocksService.calculateGains(quotationOnPurchasedDay, quotationToday, purchasedAmount)

    expect(capitalGains).toBe(-54.5)
  })

  it('successful transform', async () => {
    const quotationToday = StocksService.getQuotationOn(quotationsMock, dateUtils.toISODate())
    const quotationOnPurchasedDay = StocksService.getQuotationOn(quotationsMock, purchasedAt)
    const capitalGains = StocksService.calculateGains(quotationOnPurchasedDay, quotationToday, purchasedAmount)

    const gains = gainsTransform({
      stockName,
      quotationToday,
      quotationOnPurchasedDay,
      purchasedAmount,
      purchasedAt,
      capitalGains
    })

    expect(gains).toHaveProperty('name')
    expect(gains).toHaveProperty('purchasedAmount')
    expect(gains).toHaveProperty('purchasedAt')
    expect(gains).toHaveProperty('priceAtDate')
    expect(gains).toHaveProperty('lastPrice')
    expect(gains).toHaveProperty('capitalGains')
    expect(gains).toStrictEqual({
      name: "PETR4.SA",
      purchasedAmount: 50,
      purchasedAt: "2020-01-01",
      priceAtDate: 30.21,
      lastPrice: 29.12,
      capitalGains: -54.5
  })
  })
})
