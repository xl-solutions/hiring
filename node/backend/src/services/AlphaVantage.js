'use strict';

const axios = require('axios');

// @TODO: implement .env to store this information
const API_KEY = 'XYHDH2F7XHO3XQNU';
const URL = 'https://www.alphavantage.co/query';

class AlphaVantage {
    constructor() {
        this.client = axios;
    }

    /**
     * @param {string} stockName
     */
    quote(stockName) {
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
    history(stockName) {
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
    compare(stockName, stocksToCompare) {
        const stock = {};
        return this.quote(stockName)
            .then((stockCompared) => {
                stock.default = stockCompared.data;
                return Promise.all(stocksToCompare.map(toCompare => this.quote(toCompare)));
            })
            .then((stocks) => {
                stock.compared = stocks.map(compared => compared.data);
                return stock;
            });
    }

    /**
     * @param {string} stockName
     */
    gains(stockName, purchasedAmount, purchasedAt) {
        const requests = [
            this.history(stockName, purchasedAt, purchasedAt),
            this.quote(stockName),
        ];

        return Promise.all(requests)
            .then((response) => {
                const date = new Date(purchasedAt).toISOString().substring(0, 10);
                const toCalc = response[0].data['Time Series (Daily)'][date];
                const current = response[1].data;
                const gains = toCalc['4. close'] * purchasedAmount - current['Global Quote']['08. previous close'] * purchasedAmount;

                return {
                    toCalc,
                    current,
                    gains,
                };
            });
    }
}

module.exports = AlphaVantage;
