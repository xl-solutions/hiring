import History from '../interfaces/Pricing'

export function filterPrices(data: object, from: string, to: string): Array<string> {
  const filtered = Object.keys(data).filter((date) => {
    const priceDate = new Date(date)
    const fromDate = new Date(from)
    const toDate = new Date(to)

    return (
      priceDate.getTime() >= fromDate.getTime() &&
      priceDate.getTime() <= toDate.getTime()
    )
  })

  return filtered
}

export default (data: object, from: string, to: string): History => {
  const name = data['Meta Data']['2. Symbol']
  const historicalData = data['Time Series (Daily)']

  const prices = filterPrices(historicalData, from, to).map((date) => {
    const priceDay = historicalData[date]

    const opening = Number(priceDay['1. open'])
    const low = Number(priceDay['3. low'])
    const high = Number(priceDay['2. high'])
    const closing = Number(priceDay['4. close'])
    const priceAt = date

    return {
      opening,
      low,
      high,
      closing,
      priceAt
    }
  })

  return {
    name,
    prices
  }
}
