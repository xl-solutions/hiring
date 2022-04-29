import currencyConversion from "./CurrencyConversion.js";

// Get close price at date
const getClosePrice = (dateData) => {
  return dateData[Object.keys(dateData)[3]];
}

const gainsProjection = async (query, stockSymbol, stockData, stockInformation, currency) => {
  // Set variables
  const { purchasedAmount, purchasedAt } = query;
  const lastRefreshDate = stockInformation[Object.keys(stockInformation)[2]];
  const lastPrice = await currencyConversion(getClosePrice(stockData[lastRefreshDate]), lastRefreshDate, currency);
  const priceAtDate = await currencyConversion(getClosePrice(stockData[purchasedAt]), purchasedAt, currency);
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