const axios = require('axios');
const StockQuote = require('../models/stockQuote');
const StockHistory = require('../models/stockHistory');
const Pricing = require('../models/pricing');
const LastPrice = require('../models/lastPrice');
const StockGains = require('../models/stockGains');

const token = "bae5d312fbff31b410cf39d2bf55cf32";
const baseUrlApi = "http://api.marketstack.com/v1/";


const quote = async(stock_name) => {
    if(!stock_name) {
        throw new Error("Stock_name debe completarse"); 
    }
    const urlQuote = baseUrlApi + "intraday/latest?access_key=" + token + "&symbols=" + stock_name;
    const response = await axios.get(urlQuote);
    const stockQuote = new StockQuote(stock_name, response.data["data"][0]["open"], response.data["data"][0]["date"]);
    return stockQuote;
};

const history = async(stock_name, from, to) => {
    if(!stock_name) {
        throw new Error("Stock_name debe completarse"); 
    }
    const urlHistory = baseUrlApi + "eod?access_key=" + token + "&symbols=" + stock_name + "&date_from=" + from + "&date_to=" + to;
    const response = await axios.get(urlHistory);
    const prices = response.data["data"];
    const historyPrices = prices.map(price => {return new Pricing(price.open, price.low, price.high, price.close, price.date)});
    const stockHistory = new StockHistory(stock_name, historyPrices)
    return stockHistory;
};
const compare = async(stock_name) => {
    if(!stock_name) {
        throw new Error("Stock_name debe completarse"); 
    }
    const urlCompare = baseUrlApi + "intraday/latest?access_key=" + token + "&symbols=" + stock_name;
    const response = await axios.get(urlCompare);
    const stocks = response.data["data"];
    const stockCompare = stocks.map(stock => {return new LastPrice(stock.symbol, stock.open, stock.date)});
    return stockCompare;
};
const gains = async(stock_name, purchasedAmount, purchasedAt) => {
    if(!stock_name) {
        throw new Error("Stock_name debe completarse"); 
    }
    const urlLastPrice = baseUrlApi + "intraday?access_key=" + token + "&symbols=" + stock_name;
    const urlpriceAtDate = baseUrlApi + "intraday/" + purchasedAt + "?access_key=" + token + "&symbols=" + stock_name;
    const responseLastPrice = await axios.get(urlLastPrice);
    const responsepriceAtDate = await axios.get(urlpriceAtDate);
    const lastPrice = responseLastPrice.data["data"][0]['open'];
    const priceAtDate = responsepriceAtDate.data["data"][0]['open'];
    const stockGains = new StockGains(stock_name, purchasedAmount, purchasedAt, priceAtDate, lastPrice);
    return stockGains;
};

const stockService = {quote, history, compare, gains};


module.exports = stockService;