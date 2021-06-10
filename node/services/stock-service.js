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

    async getComparedQuote(stockName, otherStocks) {
        try {
            const retorno = await this.stocks.getMostRecentQuote(stockName)
            let otherRetorno = []
            if (Object.keys(retorno.data['Global Quote']).length === 0) {
                throw new Error('Not possible to compare, no data found on principal Stock')
            }
            const uniq = [...new Set(otherStocks)];
            for (let i = 0; i < uniq.length; i++) {
                try {
                    let ret = await this.stocks.getMostRecentQuote(uniq[i])

                    if (Object.keys(ret.data['Global Quote']).length != 0) {
                        otherRetorno.push(ret.data['Global Quote'])
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            otherRetorno.unshift(retorno.data['Global Quote'])
            return otherRetorno

        } catch (error) {
            console.log(error)
            return { error }
        }
    }

    async getGains(stockName, purchasedAmount, purchasedAt) {

        const recentReturn = await this.stocks.getMostRecentQuote(stockName)

        if (Object.keys(recentReturn.data['Global Quote']).length == 0) {
            return { error: 'Maybe the stock name is not valid' }
        }
        const historyReturn = await this.stocks.getQuoteHistory(stockName)


        const historyData = historyReturn.data['Time Series (Daily)']
        const newHistory = this._getInterval(historyData, purchasedAt, purchasedAt)

        if (newHistory.length == 0) {
            return { error: 'Maybe the stock period of purchase is not valid' }
        }


        if (!historyReturn.data) {
            throw new Error('Not possible to compare, no data found on principal Stock')
        }

        const oldQuote = newHistory[0]
        const newQuote = recentReturn.data['Global Quote']

        const capitalGains =   (newQuote['08. previous close'] - oldQuote.closing  )* purchasedAmount 
        return {
            oldQuote,
            newQuote,
            capitalGains,
            purchasedAmount,
            purchasedAt
        }
    }


}

module.exports = StockService;
