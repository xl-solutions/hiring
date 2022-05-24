class StockGains {
    constructor(name, purchasedAmount, purchasedAt, priceAtDate, lastPrice) {
        this.name = name;
        this.purchasedAmount = parseFloat(purchasedAmount);
        this.purchasedAt = new Date(purchasedAt);
        this.priceAtDate = priceAtDate;
        this.lastPrice = lastPrice;
        this.capitalGains = (lastPrice - priceAtDate) * parseFloat(purchasedAmount);
    }
}

module.exports = StockGains;