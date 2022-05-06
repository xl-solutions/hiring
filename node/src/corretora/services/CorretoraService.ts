import axios from 'axios';

const functionsAlphaVantage = {
	1: 'function=TIME_SERIES_DAILY'
};

export class CorretoraService {

	async getCotacaoRecenteBySymbol(stockName: string) {
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
}
