// Get close price at date
const getClosePrice = (dateData) => {
  return dateData[Object.keys(dateData)[3]];
}

const gainsProjection = (query, stockSymbol, stockData, stockInformation) => {
  // Set variables
  const { purchasedAmount, purchasedAt } = query;
  const lastRefreshDate = stockInformation[Object.keys(stockInformation)[2]];
  const lastPrice = parseFloat(getClosePrice(stockData[lastRefreshDate]));
  const priceAtDate = parseFloat(getClosePrice(stockData[purchasedAt]));
  const capitalGains = (lastPrice - priceAtDate) * parseFloat(purchasedAmount);
  // Creating object return
  const result = {
    "name": stockSymbol,
    "purchasedAmount": parseFloat(purchasedAmount),
    "purchasedAt": purchasedAt,
    "priceAtDate": priceAtDate,
    "lastPrice": lastPrice,
    "capitalGains": capitalGains
  };

  return result;

}

export default gainsProjection;