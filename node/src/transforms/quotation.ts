import Quotation from '../interfaces/Quotation'

export default (data: object): Quotation => {
  const quotation = data['Global Quote']

  return {
    name: quotation['01. symbol'],
    lastPrice: Number(quotation['05. price']),
    priceAt: new Date(quotation['07. latest trading day']).toISOString()
  }
}
