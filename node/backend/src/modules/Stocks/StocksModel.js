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
        return this.service.quote(stockName)
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
        return this.service.history(stockName)
            .then((response) => {
                this._verifyResponse(response.data);
                return StocksTransform.history(response.data, from, to);
            });
    }

    /**
     * @param {string} stockName
     * @param {string} stocks Array of stocks to compare
     */
    compare(stockName, stocks) {
        return this.service.compare(stockName, stocks)
            .then(response => StocksTransform.compare(response));
    }

    /**
     * @param {string} stockName
     * @param {string} purchasedAmount
     * @param {string} purchasedAt
     */
    gains(stockName, purchasedAmount, purchasedAt) {
        return this.service.gains(stockName, purchasedAmount, purchasedAt)
            .then(response => StocksTransform.gains(stockName, purchasedAmount, purchasedAt, response));
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
