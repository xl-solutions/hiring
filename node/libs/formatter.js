class Formatter {

    transformQuote(data) {
        return {
            'name': data['01. symbol'],
            'lastPrice': data['05. price'],
            'pricedAt': data['07. latest trading day'],
        }
    }

    transformHistory(data,date) {
        return {
            'opening': data['1. open'],
            'low': data['3. low'],
            'high': data['2. high'],
            'closing': data['4. close'],
            'pricedAt': date,
        }
    }

    transformGains(data) {
        return {
            'name': data.newQuote['01. symbol'],
            'purchasedAmount': data.purchasedAmount,
            'purchasedAt': data.purchasedAt,
            'priceAtDate': data.oldQuote.closing,
            'lastPrice': data.newQuote['05. price'],
            'capitalGains': data.capitalGains.toFixed(2),
        }
    }

}

module.exports = Formatter;