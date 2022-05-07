/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface IDateRangeRequest {
	[key: string]: any;
}

interface IPricesResponse {
	[key: string]: string | number | Date;
}

type IRequestCompareQuotes = Array<string>

type IStockComparaResponse = Array<{
	name: string;
	lastPrice: number;
	pricedAt: string;
}>

interface IEarningsProjectionRequest {
	[key: string]: any;
}

const { ALPHA_VANTAGE_URL, ALPHA_VANTAGE_API_KEY } = process.env;

// Função que retorna um objeto com as ações, datas e preços da API Alpha Vantage
const fetchAlphaVantageApi = async (stockName: string) => {
	const { data } = await axios.get(
		`${ALPHA_VANTAGE_URL}${stockName}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
	);

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
		const data = await fetchAlphaVantageApi(stockName);

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
