'use strict';

class StocksTransform {
    static quote(response) {
        return this._buildCompactPrice(response);
    }

    static history(data, from, to) {
        from = new Date(from);
        to = new Date(to);

        const prices = {};
        Object.keys(data['Time Series (Daily)']).forEach((day) => {
            const currentDate = new Date(day);
            if (currentDate >= from && currentDate <= to) {
                prices[day] = data['Time Series (Daily)'][day];
            }
        });

        return {
            name: data['Meta Data']['2. Symbol'],
            prices: this._buildFullPrices(prices),
        };
    }

    /**
     * @param {Object} price Object of price in Alpha Vantage pattern
     */
    static _buildCompactPrice(price) {
        return {
            name: price['Global Quote']['01. symbol'],
            lastPrice: parseFloat(price['Global Quote']['05. price']),
            pricedAt: price['Global Quote']['07. latest trading day'], // data e hora no formato ISO 8601, UTC
        };
    }

    /**
     * @param {Object} prices
     */
    static _buildFullPrices(prices) {
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

    /**
     * @param {Object} stocks
     */
    static compare(stocks) {
        const transformed = [];
        transformed.push(this._buildCompactPrice(stocks.default));
        stocks.compared.forEach((item) => {
            if (typeof item['Global Quote'] !== 'undefined' && Object.keys(item['Global Quote']).length > 0) {
                transformed.push(this._buildCompactPrice(item));
            }
        });

        return transformed;
    }

    /**
     * @param {string} stockName
     * @param {number} purchasedAmount
     * @param {string} purchasedAt
     * @param {Object} purchasedAt
     */
    static gains(stockName, purchasedAmount, purchasedAt, data) {
        const toCalc = this._buildFullPrices([data.toCalc]);
        const current = this._buildCompactPrice(data.current);
        return {
            name: stockName,
            purchasedAmount,
            purchasedAt: new Date(purchasedAt).toISOString().substring(0, 10), // data em formato ISO 8601,
            priceAtDate: toCalc[0].pricedAt, // preço na data de compra
            lastPrice: current.pricedAt, // preço mais recente
            capitalGains: data.gains, // ganhos ou perdas com a ação, em reais
        };
    }
}

module.exports = StocksTransform;
