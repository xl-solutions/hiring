const moment = require('moment');
async function promisifyResult(result) {
	return new Promise(resolve => {
		setImmediate(() => {
			resolve(result);
		});
	});
}
module.exports = {
	async historical(options) {
		if (!options || !options.symbol || !options.from || !options.to) {
			throw new Error('Missing params');
		}
		if (!/\d{4}-\d{2}-\d{2}/.test(options.to) || !/\d{4}-\d{2}-\d{2}/.test(options.from)) {
			throw new Error('Invalid date format');
		}
		const from = moment(options.from, "YYYY-MM-DD");
		const to = moment(options.to, "YYYY-MM-DD");
		const len = moment.duration(to - from).asDays();
		if (len < 0) {
			throw new Error('"options.to" must be be greater than or equal to "options.from"');
		}
		const result = [];
		let i = 0;
		do {
			result.push({
				date: moment(options.from).add(i, 'days')._d,
				open: 18 + Math.random() * 2,
				high: 18 + Math.random() * 2,
				low: 18 + Math.random() * 2,
				close: 18 + Math.random() * 2,
				volume: 34736300 + parseInt(Math.random() * 100),
				symbol: options.symbol
			});
			i++;
		} while (i <= len);
		return promisifyResult(result);
	}
};