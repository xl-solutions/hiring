import quotationTransform from '../../../src/transforms/quotation'
import quotationMock from '../../mocks/quotation'

describe('QUOTATION TRANSFORM', () => {
  it('successful transform', () => {
    const quotation = quotationTransform(quotationMock)

    expect(quotation).toHaveProperty('name')
    expect(quotation).toHaveProperty('lastPrice')
    expect(quotation).toHaveProperty('priceAt')
    expect(quotation).toStrictEqual({
      name: 'PETR4.SA',
      lastPrice: 29.18,
      priceAt: '2020-02-06T00:00:00.000Z'
    })
  })
})
