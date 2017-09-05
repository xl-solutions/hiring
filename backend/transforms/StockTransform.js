class StockTransform {
    _setFields(data) {
        return {
            name: data.symbol,
            lastPrice: data.close,
            pricedAt: data.date,
        };
    }

    _setFullFields(data) {
        return {
            opening: data.open,
            low: data.low,
            high: data.high,
            closing: data.close,
            pricedAt: data.date,
        };
    }

    transformQuote(data) {
        if (Array.isArray(data)) {
            return data.map((item) => {
               return this._setFields(item);
            });
        }

        return this._setFields(data);
    }

    transformQuoteHistory(data) {
        return {
            name: data[0].symbol,
            prices: data.map((item) => {
                return this._setFullFields(item);
            }),
        }
    }

    transformCompare(data) {
        const lastPrices = data.map((item) => {
            return this._setFields(item);
        });

        return {lastPrices};
    }

    transformProjectGains(data) {
        return {
            name: data.purchasedQuote.symbol,
            purchasedAmount: data.purchasedAmount,
            purchasedAt: data.purchasedAt,
            priceAtDate: data.purchasedQuote.close,
            lastPrice: data.recentQuote.close,
            capitalGains: data.capitalGains.toFixed(2),
        }
    }
}

module.exports = StockTransform;
