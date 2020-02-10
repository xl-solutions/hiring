import Gain from '../interfaces/Gain'

export default (data): Gain => {
  const {
    stockName,
    quotationToday,
    quotationOnPurchasedDay,
    purchasedAmount,
    purchasedAt,
    capitalGains
  } = data

  return {
    name: stockName,
    purchasedAmount: Number(purchasedAmount),
    purchasedAt,
    priceAtDate: Number(quotationOnPurchasedDay['4. close']),
    lastPrice: Number(quotationToday['4. close']),
    capitalGains
  }
}
