'use strict';

class StocksTransform {
    static quote(response) {
        return {
            name: response['Global Quote']['01. symbol'],
            lastPrice: parseFloat(response['Global Quote']['05. price']),
            pricedAt: response['Global Quote']['07. latest trading day'], // data e hora no formato ISO 8601, UTC
        };
    }

    static history(name, prices) {
        return {
            name,
            prices: this._buildPrice(prices),
        };
    }

    /**
     * @param {Object} prices
     */
    static _buildPrice(prices) {
        return Object.keys(prices).map((date) => {
            return {
                opening: prices[date]['1. open'],
                low: prices[date]['3. low'],
                high: prices[date]['2. high'],
                closing: prices[date]['4. close'],
                pricedAt: date, // data no formato ISO 8601, UTC
            };
        });
    }
}

module.exports = StocksTransform;
