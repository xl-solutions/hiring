const axios = require('axios');
const StockQuote = require('../models/stockQuote');

const token = "01510245e5dd40cb0e400642a7eae181";
const baseUrlApi = "http://api.marketstack.com/v1/";


const quote = async(stock_name) => {
    const urlQuote = baseUrlApi + "intraday/latest?access_key=" + token + "&symbols=" + stock_name;
    const response = await axios.get(urlQuote);
    const stockQuote = new StockQuote(stock_name, response.data["data"][0]["open"], response.data["data"][0]["date"]);
    return stockQuote;
};

const history = (stock_name, from, to) => {
   
};
const compare = (stock_name) => {
    
};
const gains = (stock_name, purchasedAmount, purchasedAt) => {
    
};

const stockService = {quote, history, compare, gains};


module.exports = stockService;