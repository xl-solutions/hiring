'use strict';

const HttpError = require('http-errors');

const StocksTransform = require('./StocksTransform');
const Service = require('../../services/AlphaVantage');

class StocksModel {
    constructor() {
        this.service = new Service();
    }

    /**
     * @param {string} stockName
     */
    quote(stockName) {
        return this.service.getQuote(stockName)
            .then((response) => {
                if (Object.keys(response.data['Global Quote']).length === 0) {
                    return {};
                }
                return StocksTransform.quote(response.data);
            });
    }

    /**
     * @param {string} stockName
     * @param {string} from A date in ISO format
     * @param {string} to A date in ISO format
     */
    history(stockName, from, to) {
        return this.service.getHistory(stockName)
            .then((response) => {
                this._verifyResponse(response.data);

                from = new Date(from);
                to = new Date(to);

                const prices = {};
                Object.keys(response.data['Time Series (Daily)']).forEach((day) => {
                    const currentDate = new Date(day);
                    if (currentDate >= from && currentDate <= to) {
                        prices[day] = response.data['Time Series (Daily)'][day];
                    }
                });

                return StocksTransform.history(response.data['Meta Data']['2. Symbol'], prices);
            });
    }

    /**
     * @param {string} stockName
     * @param {string} stocks Array of stocks to compare
     */
    compare(stockName, stocks) {
        return this.service.compare(stockName)
            .then((response) => {
                this._verifyResponse(response.data);
                return stocks;
            });
    }

    /**
     * @param {string} stockName
     * @param {string} purchasedAmount
     * @param {string} purchasedAt
     */
    gains(stockName, purchasedAmount, purchasedAt) {
        return this.service.compare(stockName)
            .then((response) => {
                this._verifyResponse(response.data);
                return {
                    stockName, purchasedAmount, purchasedAt,
                };
            });
    }

    /**
     * @param {Object} data
     */
    _verifyResponse(data) {
        this.data = data;
        if (typeof data['Error Message'] !== 'undefined') {
            throw new HttpError(400, data['Error Message'], { code: 400 });
        }
    }
}

module.exports = StocksModel;
