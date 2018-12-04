'use strict';

const axios = require('axios');

const API_KEY = 'XYHDH2F7XHO3XQNU';
const URL = 'https://www.alphavantage.co/query';

class AlphaVantage {
    constructor() {
        this.client = axios;
    }

    getQuote(stockName) {
        return this.client.get(URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: stockName,
                apikey: API_KEY,
            },
        });
    }
}

module.exports = AlphaVantage;
