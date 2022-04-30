import currencyConversion from "./CurrencyConversion.js";
import roundNumber from "./RoundNumber.js"

const recentQuote = async (stockSymbol, stockInformation, currency) => {
  // Set variables
  const lastRefreshDate = stockInformation[Object.keys(stockInformation)[6]];
  const lastRefreshPrice = stockInformation[Object.keys(stockInformation)[7]];
  const lastPrice = await currencyConversion(lastRefreshPrice, lastRefreshDate, currency);
  // Creating object return

  const result = {
    "name": stockSymbol,
    "lastPrice": roundNumber(parseFloat(lastPrice)),
    "pricedAt": lastRefreshDate
  };

  return result;

}

export default recentQuote;