const axios = require('axios');
const StockQuote = require('../models/stockQuote');
const StockHistory = require('../models/stockHistory');
const Pricing = require('../models/pricing');
const LastPrice = require('../models/lastPrice');

const token = "01510245e5dd40cb0e400642a7eae181";
const baseUrlApi = "http://api.marketstack.com/v1/";


const quote = async(stock_name) => {
    const urlQuote = baseUrlApi + "intraday/latest?access_key=" + token + "&symbols=" + stock_name;
    const response = await axios.get(urlQuote);
    const stockQuote = new StockQuote(stock_name, response.data["data"][0]["open"], response.data["data"][0]["date"]);
    return stockQuote;
};

const history = async(stock_name, from, to) => {
    const urlHistory = baseUrlApi + "eod?access_key=" + token + "&symbols=" + stock_name + "&date_from=" + from + "&date_to=" + to;
    const response = await axios.get(urlHistory);
    const prices = response.data["data"];
    const historyPrices = prices.map(price => {return new Pricing(price.open, price.low, price.high, price.close, price.date)});
    const stockHistory = new StockHistory(stock_name, historyPrices)
    return stockHistory;
};
const compare = async(stock_name) => {
    const urlCompare = baseUrlApi + "intraday/latest?access_key=" + token + "&symbols=" + stock_name;
    const response = await axios.get(urlCompare);
    const stocks = response.data["data"];
    const stockCompare = stocks.map(stock => {return new LastPrice(stock.symbol, stock.open, stock.date)});
    return stockCompare;
};
const gains = (stock_name, purchasedAmount, purchasedAt) => {
    
};

const stockService = {quote, history, compare, gains};


module.exports = stockService;