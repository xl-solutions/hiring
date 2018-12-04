'use strict';

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
                // @TODO: verify if is a valid response
                return StocksTransform.quote(response.data);
            });
    }
}

module.exports = StocksModel;
