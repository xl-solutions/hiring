import transformQuotation from './quotation'
import LastPrices from '../interfaces/LastPrice'

export default (data: Array<object>): LastPrices => {
  const lastPrices = data
    .filter((price) => price['Global Quote'])
    .map((price) => transformQuotation(price))

  return { lastPrices }
}
