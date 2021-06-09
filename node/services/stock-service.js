const Alpha = require('../integrations/alpha');
const Formatter = require('../libs/formatter');

class StockService {
    constructor() {
        this.stocks = new Alpha();
        this._formatter = new Formatter();
    }

    _getInterval(result, from, to) {
        let formated = []
        for (let data in result) {

            if (data >= from && data <= to) {

                formated.push(this._formatter.transformHistory(result[data], data))
            }

        }
        return formated
    }

    async getMostRecentQuote(stockName) {
        try {
            const retorno = await this.stocks.getMostRecentQuote(stockName)

            if (Object.keys(retorno.data['Global Quote']).length == 0) {
                return { error: 'Maybe the stock name is not valid' }
            }
            return retorno.data['Global Quote']

        } catch (e) {
            return {}

        }
    }

    async getHistoryQuote(stockName, from, to) {
        const retorno = await this.stocks.getQuoteHistory(stockName)
        if (!retorno.data) {
            throw new Error('Teste')
        }
        const resultData = retorno.data['Time Series (Daily)']
        const newResult = this._getInterval(resultData, from, to)
        return newResult
    }

   


}

module.exports = StockService;
