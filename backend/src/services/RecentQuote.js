import currencyConversion from "./CurrencyConversion.js";

const recentQuote = async (stockSymbol, stockData, stockInformation) => {
  // Set variables
  const lastRefreshDate = stockInformation[Object.keys(stockInformation)[2]];
  const stockLastData = stockData[lastRefreshDate];
  const lastRefreshPrice = stockLastData[Object.keys(stockLastData)[3]];
  const lastPrice = await currencyConversion(lastRefreshPrice, lastRefreshDate.replace(/\s.*/, ""));
  // Creating object return
  const result = {
    "name": stockSymbol,
    "lastPrice": parseFloat(lastPrice),
    "pricedAt": `${lastRefreshDate.replace(/\s/, "T")}Z`
  };

  return result;

}

export default recentQuote;