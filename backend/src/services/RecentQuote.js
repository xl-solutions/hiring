import currencyConversion from "./CurrencyConversion.js";

const recentQuote = async (stockSymbol, stockInformation) => {
  // Set variables
  const lastRefreshDate = stockInformation[Object.keys(stockInformation)[6]];
  const lastRefreshPrice = stockInformation[Object.keys(stockInformation)[7]];
  const lastPrice = await currencyConversion(lastRefreshPrice, lastRefreshDate);
  // Creating object return

  const result = {
    "name": stockSymbol,
    "lastPrice": parseFloat(lastPrice),
    "pricedAt": lastRefreshDate
  };

  return result;

}

export default recentQuote;