import quotationTransform from '../../../src/transforms/quotation'
import quotationMock from '../../mocks/quotation'

describe('QUOTATION TRANSFORM', () => {
  it('successful transform', () => {
    const quotation = quotationTransform(quotationMock)

    expect(quotation).toHaveProperty('name')
    expect(quotation).toHaveProperty('lastPrice')
    expect(quotation).toHaveProperty('pricedAt')
    expect(quotation).toStrictEqual({
      name: 'PETR4.SA',
      lastPrice: 29.18,
      pricedAt: '2020-02-06'
    })
  })
})
