import currencyConversion from "./CurrencyConversion.js";
import roundNumber from "./RoundNumber.js"

const stockHistory = async (stockSymbol, stockData, fromDate, toDate, currency) => {
  const historyArray = [];
  for(const stock of Object.keys(stockData)) {
    if (stockData[fromDate] && stockData[toDate]) {
      if (stock === fromDate || stock === toDate || historyArray.length) {
        const currencyQuote = await currencyConversion(1, stock, currency)
        const stockOpening = parseFloat(stockData[stock][Object.keys(stockData[stock])[0]]) * currencyQuote;
        const stockLow = parseFloat(stockData[stock][Object.keys(stockData[stock])[2]]) * currencyQuote;
        const stockHigh = parseFloat(stockData[stock][Object.keys(stockData[stock])[1]]) * currencyQuote;
        const stockClosing = parseFloat(stockData[stock][Object.keys(stockData[stock])[3]]) * currencyQuote;
        historyArray.push({
          "opening": roundNumber(stockOpening),
          "low": roundNumber(stockLow),
          "high": roundNumber(stockHigh),
          "closing": roundNumber(stockClosing),
          "pricedAt": stock
        })
        if (stock === fromDate) {
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