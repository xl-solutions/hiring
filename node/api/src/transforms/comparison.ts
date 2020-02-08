import transformQuotation from './quotation'
import LastPrices from '../interfaces/LastPrice'

export default (data: Array<object>): LastPrices => {
  const lastPrices = data.map((price) => transformQuotation(price))
  return { lastPrices }
}
