/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api/AlphaApi';

export interface IDateRangeRequest {
	[key: string]: any;
}

export interface IPricesResponse {
	[key: string]: string | number | Date;
}

export type IRequestCompareQuotes = Array<string>

export type IStockComparaResponse = Array<{
	name: string;
	lastPrice: number;
	pricedAt: string;
}>

export interface IEarningsProjectionRequest {
	[key: string]: any;
}

const { ALPHA_VANTAGE_API_KEY } = process.env;

// Função que retorna um objeto com as ações, datas e preços da API Alpha Vantage
const fetchAlphaVantageApi = async (stockName: string) => {
	const { data } = await api.get(
		`${stockName}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
	);

	if (data['Error Message']) {
		throw new Error(data['Error Message']);
	}

	if (data['Note']) {
		throw new Error(data['Note']);
	}

	return data;
};

export class StockBrokerService {

	async getRecentQuoteBySymbol(stockName: string) {

		const data = await fetchAlphaVantageApi(stockName);

		const metaData = data['Meta Data'];

		const pricedAt = new Date(metaData['3. Last Refreshed']);

		const lastPrice = Number(
			data['Time Series (Daily)'][pricedAt.toISOString().slice(0, 10)]['4. close']
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

		if (!Date.parse(from)) {
			throw Error('Invalid from date format');
		}

		if (!Date.parse(to)) {
			throw new Error('Invalid to date format');
		}

		const startDate = new Date(from);
		const endDate = new Date(to);

		if (startDate > endDate) {
			throw new Error('"From" date must be less than "To" date');
		}

		const prices: IPricesResponse[] = [];

		const data = await fetchAlphaVantageApi(stockName);

		Object.entries(data['Time Series (Daily)'])
			.forEach(([key, value]: [string, any]) => {
				const keyDate = new Date(key);
				if (keyDate >= startDate && keyDate <= endDate) {
					prices.push({
						opening: Number(value['1. open']),
						high: Number(value['2. high']),
						low: Number(value['3. low']),
						closing: Number(value['4. close']),
						pricedAt: keyDate
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

		const data = await fetchAlphaVantageApi(stockName);

		const pricedAt = data['Meta Data']['3. Last Refreshed'];

		lastPrices.push({
			name: stockName,
			lastPrice: Number(data['Time Series (Daily)'][pricedAt]['4. close']),
			pricedAt
		});

		for (const stockName of stocksRequest) {
			const data = await fetchAlphaVantageApi(stockName);

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

	async getEarningsProjection(
		stockName: string,
		{ purchasedAmount, purchasedAt }: IEarningsProjectionRequest
	) {

		if (!Date.parse(purchasedAt)) {
			throw Error('Invalid purchasedAt date format');
		}

		const data = await fetchAlphaVantageApi(stockName);

		const lastRefreshed = data['Meta Data']['3. Last Refreshed'];

		const valuePurchasedDate = Number(
			data['Time Series (Daily)'][purchasedAt]['4. close']
		);

		// Calculo da porcentagem das ações: valor atual / valor cromprado - 1 * 100
		const sumPercentage = Number(
			data['Time Series (Daily)'][lastRefreshed]['4. close'] / valuePurchasedDate - 1
		) * 100;

		const capitalGains = Number(sumPercentage / 100) * purchasedAmount;

		return {
			name: stockName,
			purchasedAmount: Number(purchasedAmount),
			purchasedAt,
			priceAtDate: valuePurchasedDate,
			lastPrice: Number(data['Time Series (Daily)'][lastRefreshed]['4. close']),
			capitalGains: Number(capitalGains.toFixed(2))
		};
	}
}
