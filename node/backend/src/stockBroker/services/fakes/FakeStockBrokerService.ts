/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IDateRangeRequest,
	IEarningsProjectionRequest,
	IPricesResponse,
	IRequestCompareQuotes,
	IStockComparaResponse
} from '../StockBrokerService';

const dataIbm = {
	'Meta Data': {
		'1. Information': 'Daily Prices (open, high, low, close) and Volumes',
		'2. Symbol': 'IBM',
		'3. Last Refreshed': '2022-05-06',
		'4. Output Size': 'Full size',
		'5. Time Zone': 'US/Eastern'
	},
	'Time Series (Daily)': {
		'2022-05-06': {
			'1. open': '135.4700',
			'2. high': '137.9900',
			'3. low': '135.4700',
			'4. close': '137.6700',
			'5. volume': '7306396'
		},
		'2022-05-05': {
			'1. open': '136.4600',
			'2. high': '137.2600',
			'3. low': '134.7600',
			'4. close': '135.9200',
			'5. volume': '5957434'
		}
	}
};

const dataTimp3 = {
	'Meta Data': {
		'1. Information': 'Daily Prices (open, high, low, close) and Volumes',
		'2. Symbol': 'TIMP3.SA',
		'3. Last Refreshed': '2020-10-09',
		'4. Output Size': 'Full size',
		'5. Time Zone': 'US/Eastern'
	},
	'Time Series (Daily)': {
		'2020-10-09': {
			'1. open': '13.5000',
			'2. high': '13.8000',
			'3. low': '13.2700',
			'4. close': '13.4600',
			'5. volume': '11073900'
		},
		'2020-10-08': {
			'1. open': '13.2500',
			'2. high': '13.6400',
			'3. low': '13.0200',
			'4. close': '13.5800',
			'5. volume': '12769900'
		}
	}
};

export class FakeStockBrokerService {
	async getRecentQuoteBySymbol(stockName: string) {

		const metaData = dataIbm['Meta Data'];

		const pricedAt = new Date(metaData['3. Last Refreshed']);

		const lastPrice = Number(
			dataIbm['Time Series (Daily)']['2022-05-06']['4. close']
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
		const prices: IPricesResponse[] = [];

		Object.entries(dataIbm['Time Series (Daily)'])
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

		const pricedAt = dataIbm['Meta Data']['3. Last Refreshed'];

		lastPrices.push({
			name: stockName,
			lastPrice: Number(dataIbm['Time Series (Daily)']['2022-05-06']['4. close']),
			pricedAt
		});

		for (const stockName of stocksRequest) {
			Object.entries(dataTimp3['Time Series (Daily)'])
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

		const valuePurchasedDate = Number(
			dataIbm['Time Series (Daily)']['2022-05-05']['4. close']
		);

		// Calculo da porcentagem das ações: valor atual / valor cromprado - 1 * 100
		const sumPercentage = (
			Number(dataIbm['Time Series (Daily)']['2022-05-06']['4. close']) / valuePurchasedDate - 1
		) * 100;

		const capitalGains = Number(sumPercentage / 100) * purchasedAmount;

		return {
			name: stockName,
			purchasedAmount: Number(purchasedAmount),
			purchasedAt: new Date(purchasedAt),
			priceAtDate: valuePurchasedDate,
			lastPrice: Number(dataIbm['Time Series (Daily)']['2022-05-06']['4. close']),
			capitalGains: Number(capitalGains.toFixed(2))
		};
	}
}
