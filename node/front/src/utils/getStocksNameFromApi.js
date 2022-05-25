import axios from 'axios';

export const getStocksNameFromApi = async () => {
    const stocksName = await axios.get(`http://localhost:3001/stocks/`);
    return stocksName.data.stocks;
}