const financialBusiness = require('../business/financial');
module.exports = {
	async quote(req, res) {
		try {
			const stockName = req.params && req.params.stock_name;
			if (!stockName) {
				return res.status(400).send('Missing params');
			}
			const q = await financialBusiness.getRecentQuote(stockName.toUpperCase());
			if (!q) {
				return res.status(404).send('Can not find the requested data');
			}
			return res.json(q);
		} catch (e) {
			const message = typeof e == 'string' ? e : e.message;
			return res.status(500).send(message);
		}
	},
	async history(req, res) {
		try {
			const stockName = req.params && req.params.stock_name;
			const from = req.query && req.query.from;
			const to = req.query && req.query.to;
			if (!stockName || !from || !to || !/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
				return res.status(400).send('Missing params');
			}
			const h = await financialBusiness.getHistoricalQuote(stockName.toUpperCase(), from, to);
			if (!h) {
				return res.status(404).send('Can not find the requested data');
			}
			return res.json(h);
		} catch (e) {
			const message = typeof e == 'string' ? e : e.message;
			return res.status(500).send(message);
		}
	},
	async compare(req, res) {
		try {
			const stockName = req.params && req.params.stock_name;
			const stocksNames = req.body && req.body.stocks;
			if (!stockName || !stocksNames || !Array.isArray(stocksNames)) {
				return res.status(400).send('Missing params');
			}
			const stocks = [stockName.toUpperCase()];
			stocksNames.forEach(name => {
				if (typeof name == 'string') {
					stocks.push(name.toUpperCase());
				}
			});
			const c = await financialBusiness.getStocksDataParalel(stocks);
			return res.json(c);
		} catch (e) {
			const message = typeof e == 'string' ? e : e.message;
			return res.status(500).send(message);
		}
	},
	async gains(req, res) {
		try {
			const stockName = req.params && req.params.stock_name;
			const purchasedAmount = req.query && req.query.purchasedAmount && parseInt(req.query.purchasedAmount);
			const purchasedAt = req.query && req.query.purchasedAt;
			if (!stockName || !purchasedAmount || !purchasedAt || !/^\d{4}-\d{2}-\d{2}$/.test(purchasedAt)) {
				return res.status(400).send('Missing params');
			}
			const g = await financialBusiness.projectGains(stockName.toUpperCase(), purchasedAmount, purchasedAt);
			if (!g) {
				return res.status(404).send('Can not find the requested data');
			}
			return res.json(g);
		} catch (e) {
			const message = typeof e == 'string' ? e : e.message;
			return res.status(500).send(message);
		}
	}
};