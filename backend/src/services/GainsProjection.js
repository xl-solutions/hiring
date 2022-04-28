import currencyConversion from "./CurrencyConversion.js";

// Get close price at date
const getClosePrice = (dateData) => {
  return dateData[Object.keys(dateData)[3]];
}

const gainsProjection = async (query, stockSymbol, stockData, stockInformation) => {
  // Set variables
  const { purchasedAmount, purchasedAt } = query;
  const lastRefreshDate = stockInformation[Object.keys(stockInformation)[2]];
  const lastPrice = await currencyConversion(getClosePrice(stockData[lastRefreshDate]), lastRefreshDate);
  const priceAtDate = await currencyConversion(getClosePrice(stockData[purchasedAt]), purchasedAt);
  const capitalGains = (parseFloat(lastPrice) - parseFloat(priceAtDate)) * parseFloat(purchasedAmount);
  // Creating object return
  const result = {
    "name": stockSymbol,
    "purchasedAmount": parseFloat(purchasedAmount),
    "purchasedAt": purchasedAt,
    "priceAtDate": parseFloat(priceAtDate),
    "lastPrice": parseFloat(lastPrice),
    "capitalGains": capitalGains
  };

  return result;

}

export default gainsProjection;