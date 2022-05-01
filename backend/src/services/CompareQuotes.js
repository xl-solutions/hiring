import requestGet from "../services/StocksService.js";
import recentQuote from "../services/RecentQuote.js";
import getStockCurrency from "../services/GetStockCurrency.js";

const compareQuotes = async (stockSymbolArray, stockFunction, stockInterval) => {
  const resultArray = [];
  for(const stockName of stockSymbolArray){
    const { stockSymbol, currency } = await getStockCurrency(stockName);
    const response = await requestGet(stockFunction, stockSymbol, stockInterval);
    const informationData = response[Object.keys(response)[0]];
    const quoteResult = await recentQuote(stockSymbol, informationData, currency);
    resultArray.push(quoteResult);
  }
  const result = {
    "lastPrices": resultArray
  };
  
  return result;
}

export default compareQuotes;