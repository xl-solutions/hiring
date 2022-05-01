import getStockData from "./GetStockData.js";

const requestGet = async (stockFunction, stockSymbol, stockInterval) => {
  // Only for example, more keys to avoid access blocks
  const randomApi = [
    "S36E5NC9SNC9VEC6", "WGWLUP8QMCCJSYE8", "1DOG6UT2OB3EH3MG", "UGYH22ZSX0Q6ZBZT", "WUHB7O19IJMHEPMW", "442KFBZQUBG0SLLB", "O6QV3ERFSG8IFXC0",
    "1DF8XCGEF8ME49GY", "O4VV1TND3K8HCYEI", "JJUP7RLSZPIQ2N5X", "70FYN9TXOXW9GU5A", "9MRYCP1CP1UJIL2A", "A2LAUD53I0R8JZUZ", "QWPJHLM7X3G6Y4KJ",
    "W0XA2EVBYBVE6P1G", "8JGKZMDMTSKXM9U2", "LD7091XHVBLSXZOB", "R52F5J4RX5J4P50O", "T51DWVHZRZ4JETU3", "517SUK4F5J3J3Q1J", "BCEC5J5PODZ41AF4"
  ];
  const API_KEY = randomApi[Math.floor(Math.random() * 21)];
  const url = `https://www.alphavantage.co/query?function=${stockFunction}&symbol=${stockSymbol}&keywords=${stockSymbol}&interval=${stockInterval}&apikey=${API_KEY}`;
  const response = await getStockData(url);
  return response;
}

export default requestGet;