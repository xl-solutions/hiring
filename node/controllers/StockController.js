const StockService = require('../services/stock-service');
const Formatter = require('../libs/formatter');
const Stock = require('../integrations/alpha');


class StockController {
    constructor() {

        this._stocks = new StockService();
        this._formatter = new Formatter();
    }

    _getInterval(result, from, to) {
        let formated = []
        for (let data in result) {

            if (data > from && data < to) {
                formated.push(this._formatter.transformHistory(result[data], data))
            }

        }
        return formated
    }

    async getQuotes(req, res) {
        const stockName = req.params.stock_name;
        const result = await this._stocks.getMostRecentQuote(stockName)
        if (result.error) {
            return res.status(500).send({ error: result.error });
            
        }
        const resultFormatted = this._formatter.transformQuote(result)

        return res.json(resultFormatted)
    }

    async getHistory(req, res) {
        const stockName = req.params.stock_name;
        const from = req.query.from;
        const to = req.query.to;
        const result = await this._stocks.getHistoryQuote(stockName, from, to)
        if (result.error) {
            return res.json(result.error)
        }
        return res.json({ name: stockName, prices: result })
    }

    async getCompared(req, res) {
        const stockName = req.params.stock_name;
        const otherStocks = req.body.stocks;
        const result = await this._stocks.getComparedQuote(stockName, otherStocks)
        if (result.error) {
            return res.json('Something went wrong, try again. maybe the stocks to be compared are not valid')
        }
        const resultFormatted = result.map((x) => {
            return this._formatter.transformQuote(x)
        })
        const uniq = [...new Map(resultFormatted.map(item => [item['name'], item])).values()]

        return res.json({ lastPrices: uniq })
    }

    async getGains(req, res) {
        const stockName = req.params.stock_name;
        const purchasedAmount = req.query.purchasedAmount;
        const purchasedAt = req.query.purchasedAt;
        const result = await this._stocks.getGains(stockName, purchasedAmount, purchasedAt)
        if (result.error) {
            return res.json(result.error)
        }
        const newResult = this._formatter.transformGains(result)


        return res.json(newResult)
    }

}

module.exports = StockController;
