const GoogleFinance = require('../services/GoogleFinances');
const BaseController = require('./BaseController');
const StockValidator = require('../validators/StockValidator');
const StockTransform = require('../transforms/StockTransform');

class StockController extends BaseController {
    constructor() {
        super();
        this._googleFinance = new GoogleFinance();
        this.validator = new StockValidator();
        this.transform = new StockTransform();
    }

    getQuotes(req, res) {
        const stockName = req.params.stock_name;
        return this._googleFinance.getRecentQuote(stockName)
            .then((result) => {
                const payload = this.transform.transformQuote(result);
                return res.json(payload);
            });
    }

    getHistory(req, res) {
        const stockName = req.params.stock_name;
        const from = req.query.from;
        const to = req.query.to;

        return this._googleFinance.getHistoryQuote(stockName, from, to)
            .then((results) => {
                const payload = this.transform.transformQuoteHistory(results);
                return res.json(payload);
            });
    }

    compareStocks(req, res) {
        const stockName = req.params.stock_name;
        const stocksToCompare = req.body.stocks;

        return this._googleFinance.compareStockQuotes(stockName, stocksToCompare)
            .then((results) => {
                const payload = this.transform.transformCompare(results);
                return res.json(payload);
            });
    }

    projectGains(req, res) {
        const stockName = req.params.stock_name;
        const purchasedAmount = req.query.purchasedAmount;
        const purchasedAt = req.query.purchasedAt;

        return this._googleFinance.projectGains(stockName, purchasedAmount, purchasedAt)
            .then((results) => {
                const payload = this.transform.transformProjectGains(results);
                return res.json(payload);
            });
    }
}

module.exports = StockController;
