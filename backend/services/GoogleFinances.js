const googleFinance = require('google-finance');
const helpers = require('../helpers');
const NotFoundException = require('../exceptions/NotFoundException');

class GoogleFinances {
    constructor() {
        this.googleFinance = googleFinance;
    }

    /**
     * Returns a valid operational date to get stock information
     *
     * @returns {*}
     * @private
     */
    _getOperationalDate() {
        const weekDay = helpers.date.getWeekDay();

        switch (weekDay) {
            case 'Saturday':
                return helpers.date.subtractDate(1, 'days');
            case 'Sunday':
                return helpers.date.subtractDate(2, 'days');
            default: {
                const now = new Date();
                if (now.getHours() >= 17) {
                    return helpers.date.getDate();
                }

                return helpers.date.subtractDate(1, 'days');
            }
        }
    }

    /**
     * Get the most recent quote for given stock name
     *
     * @param stockName
     * @returns {Promise}
     */
    getRecentQuote(stockName) {
        return this.googleFinance.historical({ symbol: stockName, from: this._getOperationalDate() })
            .then((result) => {
                if (!result.length) {
                    throw new NotFoundException(`Nenhum resultado encontrado para a ação: ${stockName}`);
                }

                return result[0];
            });
    }

    /**
     * Get quote information between given datetime interval
     *
     * @param stockName
     * @param from
     * @param to
     * @returns {Promise}
     */
    getHistoryQuote(stockName, from, to) {
        return this.googleFinance.historical({ symbol: stockName, from, to })
            .then((results) => {
                if (!results.length) {
                    throw new NotFoundException(`Nenhum resultado encontrado para a ação: ${stockName}`);
                }

                return results;
            });
    }

    /**
     * Compare quote for given stock names
     *
     * @param stockName
     * @param stockNamesToCompare
     * @returns {Promise}
     */
    compareStockQuotes(stockName, stockNamesToCompare) {
        let selectedStockName;

        return this.getRecentQuote(stockName)
            .then((result) => {
                selectedStockName = result;
                const promises = stockNamesToCompare.map((stockNameToCompare) => {
                   return this.getRecentQuote(stockNameToCompare);
                });

                return Promise.all(promises);
            })
            .then((stockNamesCompared) => {
                stockNamesCompared.unshift(selectedStockName);
                return stockNamesCompared;
            });
    }

    /**
     * Project gains of determined action purchased against recent closed action
     *
     * @param stockName
     * @param purchasedAmount
     * @param purchasedAt
     * @returns {Promise}
     */
    projectGains(stockName, purchasedAmount, purchasedAt) {
        return Promise.all([
            this.getHistoryQuote(stockName, purchasedAt, purchasedAt),
            this.getRecentQuote(stockName)
        ])
            .then((results) => {
                const purchasedQuote = results[0][0];
                const recentQuote = results[1];
                const capitalGains = (purchasedQuote.close * purchasedAmount) - (recentQuote.close * purchasedAmount);

                return {
                    purchasedQuote,
                    recentQuote,
                    purchasedAmount,
                    purchasedAt,
                    capitalGains,
                }
            });
    }
}

module.exports = GoogleFinances;
