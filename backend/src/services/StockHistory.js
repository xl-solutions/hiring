import currencyConversion from "./CurrencyConversion.js";

const stockHistory = async (stockSymbol, stockData, dateFrom, dateTo) => {
  const historyArray = [];
  for(const stock of Object.keys(stockData)) {
    if (stockData[dateFrom] && stockData[dateTo]) {
      if (stock === dateFrom || stock === dateTo || historyArray.length) {
        const currencyQuote = await currencyConversion(1, stock)
        historyArray.push({
          "opening": parseFloat(stockData[stock][Object.keys(stockData[stock])[0]]) * currencyQuote,
          "low": parseFloat(stockData[stock][Object.keys(stockData[stock])[2]]) * currencyQuote,
          "high": parseFloat(stockData[stock][Object.keys(stockData[stock])[1]]) * currencyQuote,
          "closing": parseFloat(stockData[stock][Object.keys(stockData[stock])[3]]) * currencyQuote,
          "pricedAt": stock
        })
        if (stock === dateTo) {
          break;
        }
      }
    } else {
      return "Error: Invalid date 'from/to'.";
    }
  }

  const result = {
    "name": stockSymbol,
    "prices": historyArray
  };

  return result;

}

export default stockHistory;