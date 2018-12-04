'use strict';

class StocksTransform {
    static quote(response) {
        return {
            name: response['Global Quote']['01. symbol'],
            lastPrice: parseFloat(response['Global Quote']['05. price']),
            pricedAt: response['Global Quote']['07. latest trading day'], // data e hora no formato ISO 8601, UTC
        };
    }
}

module.exports = StocksTransform;
