const googleFinance = require('google-finance');
module.exports = {
	async getHistorical(stockName, from, to) {
		const symbol = `BVMF:${stockName.split('.')[0]}`;
		return googleFinance.historical({
			symbol,
			from: from.format('YYYY-MM-DD'),
			to: to.format('YYYY-MM-DD')
		});
	}
}