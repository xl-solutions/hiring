import currencyConversion from "./CurrencyConversion.js";

const stockHistory = async (stockSymbol, stockData, fromDate, toDate, currency) => {
  const historyArray = [];
  for(const stock of Object.keys(stockData)) {
    if (stockData[fromDate] && stockData[toDate]) {
      if (stock === fromDate || stock === toDate || historyArray.length) {
        const currencyQuote = await currencyConversion(1, stock, currency)
        historyArray.push({
          "opening": parseFloat(stockData[stock][Object.keys(stockData[stock])[0]]) * currencyQuote,
          "low": parseFloat(stockData[stock][Object.keys(stockData[stock])[2]]) * currencyQuote,
          "high": parseFloat(stockData[stock][Object.keys(stockData[stock])[1]]) * currencyQuote,
          "closing": parseFloat(stockData[stock][Object.keys(stockData[stock])[3]]) * currencyQuote,
          "pricedAt": stock
        })
        if (stock === toDate) {
          break;
        }
      }
    } else {
      return "Error: Invalid from/to' date.";
    }
  }

  const result = {
    "name": stockSymbol,
    "prices": historyArray
  };

  return result;

}

export default stockHistory;