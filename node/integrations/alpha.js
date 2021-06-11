/* eslint-disable max-lines-per-function, no-magic-numbers */
class Stock {

    constructor() {

        this.axios = require('axios');
    }

    async _getQuoteParams(stock) {
        return {
            function: 'GLOBAL_QUOTE',
            symbol: stock,
            apikey: `${process.env.API_KEY}`
        };
    }

    async _getHistoryParams(stock) {
        return {
            function: 'TIME_SERIES_DAILY_ADJUSTED',
            symbol: stock,
            outputsize: 'full',
            apikey: `${process.env.API_KEY}`
        };
    }

    async getMostRecentQuote(stock) {
        if (!stock) { throw new Error('Alpha :: stock name is required'); }
        const url = `${process.env.API_URL}`
        const params = await this._getQuoteParams(stock);
        const response = await this.axios.get(url, { params });

        if (!response || response.error) {

            throw new Error(`Alpha :: Resposta do método /getMostRecentQuote inválido: [${JSON.stringify(response)}]`);
        }
        return response;
    }

    async getQuoteHistory(stock) {
        if (!stock) { throw new Error('Alpha :: stock name is required'); }
        const url = `${process.env.API_URL}`
        const params = await this._getHistoryParams(stock);
        const response = await this.axios.get(url, { params });
        if (!response || response.error) {

            throw new Error(`Alpha :: Resposta do método /getQuoteHistory inválido: [${JSON.stringify(response)}]`);

        }

        return response;
    }


}

module.exports = Stock;

