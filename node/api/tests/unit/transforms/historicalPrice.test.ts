import historicalPriceTransform, { filterPrices } from '../../../src/transforms/historicalPrice'
import historyPricesMock from '../../mocks/historyPrice'

describe('HISTORICAL PRICE TRANSFORM', () => {
  const from = '2020-02-01'
  const to = '2020-02-06'

  it('filter prices by date range', () => {
    const historicalData = historyPricesMock['Time Series (Daily)']
    const dates = filterPrices(historicalData, from, to)

    expect(dates.length).toBe(4)
    expect(dates).toStrictEqual(['2020-02-06', '2020-02-05', '2020-02-04', '2020-02-03'])
  })

  it('successful transform', () => {
    const history = historicalPriceTransform(historyPricesMock, from, to)

    expect(history).toHaveProperty('name')
    expect(history).toHaveProperty('prices')
    expect(history.name).toBe('PETR4.SA')
    expect(history.prices[0]).toHaveProperty('opening')
    expect(history.prices[0]).toHaveProperty('low')
    expect(history.prices[0]).toHaveProperty('high')
    expect(history.prices[0]).toHaveProperty('closing')
    expect(history.prices[0]).toHaveProperty('pricedAt')
    expect(history).toStrictEqual({
      name: 'PETR4.SA',
      prices: [
        {
          opening: 28.7,
          low: 28.12,
          high: 29.51,
          closing: 29.18,
          pricedAt: '2020-02-06'
        },
        {
          opening: 29.05,
          low: 28.39,
          high: 29.22,
          closing: 28.39,
          pricedAt: '2020-02-05'
        },
        {
          opening: 28.65,
          low: 28.56,
          high: 29.04,
          closing: 28.63,
          pricedAt: '2020-02-04'
        },
        {
          opening: 28.52,
          low: 28.16,
          high: 28.73,
          closing: 28.18,
          pricedAt: '2020-02-03'
        }
      ]
    })
  })
})
