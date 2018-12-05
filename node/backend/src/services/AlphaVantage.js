'use strict';

const axios = require('axios');

const API_KEY = 'XYHDH2F7XHO3XQNU';
const URL = 'https://www.alphavantage.co/query';

class AlphaVantage {
    constructor() {
        this.client = axios;
    }

    /**
     * @param {string} stockName
     */
    getQuote(stockName) {
        return this.client.get(URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: stockName,
                apikey: API_KEY,
            },
        });
    }

    /**
     * @param {string} stockName
     */
    getHistory(stockName) {
        return this.client.get(URL, {
            params: {
                function: 'TIME_SERIES_DAILY_ADJUSTED',
                symbol: stockName,
                apikey: API_KEY,
                outputsize: 'compact',
            },
        });
    }

    /**
     * @param {string} stockName
     */
    compare(stockName) {
        return this.client.get(URL, {
            params: {
                function: 'TIME_SERIES_DAILY_ADJUSTED',
                symbol: stockName,
                apikey: API_KEY,
                outputsize: 'compact',
            },
        });
    }

    /**
     * @param {string} stockName
     */
    gains(stockName) {
        return this.client.get(URL, {
            params: {
                function: 'TIME_SERIES_DAILY_ADJUSTED',
                symbol: stockName,
                apikey: API_KEY,
                outputsize: 'compact',
            },
        });
    }
}

module.exports = AlphaVantage;
