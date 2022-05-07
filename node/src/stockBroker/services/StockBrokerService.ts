/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface IDateRangeRequest {
	[key: string]: any;
}

interface IPricesResponse {
	[key: string]: string | number;
}

type IRequestCompareQuotes = Array<string>

type IStockComparaResponse = Array<{
	name: string;
	lastPrice: number;
	pricedAt: string;
}>

const { ALPHA_VANTAGE_URL, ALPHA_VANTAGE_API_KEY } = process.env;

const fetchALphaVantageApi = async (stockName: string) => {
	const { data } = await axios.get(
		`${ALPHA_VANTAGE_URL}${stockName}&apikey=${ALPHA_VANTAGE_API_KEY}`
	);

	return data;
};

export class StockBrokerService {

	async getRecentQuoteBySymbol(stockName: string) {

		const data = await fetchALphaVantageApi(stockName);

		const metaData = data['Meta Data'];

		const pricedAt = new Date(metaData['3. Last Refreshed'])
			.toISOString()
			.slice(0, 10);

		const lastPrice = Number(
			data['Time Series (Daily)'][pricedAt]['4. close']
		);

		return {
			name: stockName,
			lastPrice,
			pricedAt
		};
	}

	async getPriceHistoryWithDates(
		stockName: string,
		{ to, from }: IDateRangeRequest
	) {
		const data = await fetchALphaVantageApi(stockName);

		const startDate = new Date(from);
		const endDate = new Date(to);
		const prices: IPricesResponse[] = [];

		Object.entries(data['Time Series (Daily)'])
			.forEach(([key, value]: [string, any]) => {
				const keyDate = new Date(key);
				if (keyDate >= startDate && keyDate <= endDate) {
					prices.push({
						opening: Number(value['1. open']),
						high: Number(value['2. high']),
						low: Number(value['3. low']),
						closing: Number(value['4. close']),
						pricedAt: keyDate.toISOString().slice(0, 10)
					});
				}
			});

		return {
			name: stockName,
			prices
		};
	}

	async compareQuoteBetweenSymbols(
		stockName: string,
		stocksRequest: IRequestCompareQuotes
	) {

		const lastPrices: IStockComparaResponse = [];

		const data = await fetchALphaVantageApi(stockName);

		const pricedAt = data['Meta Data']['3. Last Refreshed'];

		lastPrices.push({
			name: stockName,
			lastPrice: Number(data['Time Series (Daily)'][pricedAt]['4. close']),
			pricedAt
		});

		for (const stockName of stocksRequest) {
			const data = await fetchALphaVantageApi(stockName);

			Object.entries(data['Time Series (Daily)'])
				.forEach(([key, value]: [string, any], index) => {
					if (index === 0) {
						lastPrices.push({
							name: stockName,
							lastPrice: Number(value['4. close']),
							pricedAt: key
						});
					}
				});
		}

		return { lastPrices };
	}
}
