const moment = require('moment');
const { getHistorical } = require('../service/stock');
module.exports = {
	async getRecentQuote(stockName) {
		const historical = await getHistorical(stockName, moment().subtract(5, 'days'), moment());
		if (!historical || !historical.length) {
			return;
		}
		const len = historical.length;
		return {
			name: stockName,
			lastPrice: historical[len - 1].close,
			pricedAt: historical[len - 1].date.toISOString()
		};
	},
	async getHistoricalQuote(stockName, from, to) {
		const historical = await getHistorical(stockName, moment(from, 'YYYY-MM-DD'), moment(to, 'YYYY-MM-DD'));
		if (!historical || !historical.length) {
			return;
		}
		result = {
			name: stockName
		};
		result.prices = historical.map(c => {
			return {
				opening: c.open,
				low: c.low,
				high: c.high,
				closing: c.close,
				pricedAt: c.date.toISOString()
			};
		});
		return result;
	},
	async getStocksDataParalel(stocksNames) {
		const promises = stocksNames.reduce((arr, stockName) => {
			arr.push(new Promise((resolve) => {
				this.getRecentQuote(stockName).then((fullfiled) => fullfiled ? resolve(fullfiled) : resolve({
					name: stockName
				}));
			}));
			return arr;
		}, []);
		const data = await Promise.all(promises);
		return {
			lastPrices: data
		};
	},
	async getStocksDataSerial(stocksNames) {
		const data = [];
		await stocksNames.reduce((promise, stockName) => {
			return promise.then(() => {
				return this.getRecentQuote(stockName).then(h => {
					data.push(h ? h : {
						name: stockName
					});
					return Promise.resolve();
				});
			});
		}, Promise.resolve());
		return {
			lastPrices: data
		};
	},
	async projectGains(stockName, purchasedAmount, purchasedAt) {
		const historical = await getHistorical(stockName, moment(purchasedAt, 'YYYY-MM-DD'), moment());
		if (!historical || !historical.length) {
			return;
		}
		const len = historical.length;
		return {
			name: stockName,
			purchasedAmount,
			purchasedAt: moment(historical[0].date).format('YYYY-MM-DD'),
			priceAtDate: historical[0].close,
			lastPrice: historical[len - 1].close,
			capitalGains: (historical[len - 1].close - historical[0].close) * purchasedAmount
		};
	}
};