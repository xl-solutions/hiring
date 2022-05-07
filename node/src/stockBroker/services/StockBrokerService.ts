/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface IDateRangeRequest {
	[key: string]: any;
}

interface IPricesResponse {
	[key: string]: string | number;
}

const functionsAlphaVantage = {
	1: 'function=TIME_SERIES_DAILY'
};

export class StockBrokerService {

	async getRecentQuoteBySymbol(stockName: string) {
		const { data } = await axios.get(
			`${process.env.ALPHA_VANTAGE_URL}${functionsAlphaVantage[1]}&symbol=${stockName}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
		);

		const metaData = data['Meta Data'];

		const pricedAt = new Date(metaData['3. Last Refreshed'])
			.toISOString()
			.slice(0, 10);

		const lastPrice = Number(
			data['Time Series (Daily)'][pricedAt]['4. close']
		);

		return {
			name: metaData['2. Symbol'],
			lastPrice,
			pricedAt
		};
	}

	async getPriceHistoryWithDates(
		stockName: string,
		{ to, from }: IDateRangeRequest
	) {
		const { data } = await axios.get(
			`${process.env.ALPHA_VANTAGE_URL}${functionsAlphaVantage[1]}&symbol=${stockName}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
		);

		const startDate = new Date(from);
		const endDate = new Date(to);
		const prices: IPricesResponse[] = [];

		Object.entries(data['Time Series (Daily)'])
			.forEach(([key, value]: [string, any]) => {
				if (new Date(key) >= startDate && new Date(key) <= endDate) {
					prices.push({
						opening: Number(value['1. open']),
						high: Number(value['2. high']),
						low: Number(value['3. low']),
						closing: Number(value['4. close']),
						pricedAt: new Date(key).toISOString().slice(0, 10)
					});
				}
			});

		return {
			name: data['Meta Data']['2. Symbol'],
			prices
		};
	}
}
