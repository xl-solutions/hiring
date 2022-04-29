import getStockData from "./GetStockData.js";

const requestGet = async (stockFunction, stockSymbol, stockInterval) => {
  // Only for example, more keys to avoid blocks
  const randomApi = ["S36E5NC9SNC9VEC6", "WGWLUP8QMCCJSYE8", "1DOG6UT2OB3EH3MG", "UGYH22ZSX0Q6ZBZT", "WUHB7O19IJMHEPMW", "442KFBZQUBG0SLLB", "O6QV3ERFSG8IFXC0"];
  const API_KEY = randomApi[Math.floor(Math.random() * 7)];
  const url = `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&keywords=${stockSymbol}&interval=${stockInterval}&apikey=${API_KEY}`;
  const response = await getStockData(url);
  return response;
}

export default requestGet;