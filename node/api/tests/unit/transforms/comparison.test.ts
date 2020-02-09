import comparisonTransform from '../../../src/transforms/comparison'
import comparisonMock from '../../mocks/comparison'

describe('COMPARISON TRANSFORM', () => {
  it('successful transform', () => {
    const comparison = comparisonTransform(comparisonMock)

    expect(comparison).toHaveProperty('lastPrices')
    expect(comparison.lastPrices[0]).toHaveProperty('name')
    expect(comparison.lastPrices[0]).toHaveProperty('lastPrice')
    expect(comparison.lastPrices[0]).toHaveProperty('pricedAt')
    expect(comparison).toStrictEqual({
      lastPrices: [
        { name: 'PETR4.SA', lastPrice: 29.12, pricedAt: '2020-02-07' },
        { name: 'OIBR4.SA', lastPrice: 1.36, pricedAt: '2020-02-07' },
        { name: 'MSFT', lastPrice: 183.89, pricedAt: '2020-02-07' }
      ]
    })
  })
})
