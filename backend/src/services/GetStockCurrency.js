import requestGet from "./StocksService.js";

const getStockCurrency = async (stockSymbol) => {

  const stockFunction = "SYMBOL_SEARCH";
  const stockInterval = "5min";

  const response = await requestGet(stockFunction, stockSymbol, stockInterval);
  const stockInformation = response[Object.keys(response)[0]][0];

  const result = {
    "stockSymbol": stockInformation[Object.keys(stockInformation)[0]],
    "currency": stockInformation[Object.keys(stockInformation)[7]]
  };

  return result;

}

export default getStockCurrency;