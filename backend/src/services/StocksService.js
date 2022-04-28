import getStockData from "./GetStockData.js";

const requestGet = async (stockFunction, stockSymbol, stockInterval) => {
  // const API_KEY = "S36E5NC9SNC9VEC6";
  const API_KEY = "demo";
  const url = `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&apikey=${API_KEY}`; //&interval=${stockInterval}
  const response = await getStockData(url);
  return response;
}

export default requestGet;