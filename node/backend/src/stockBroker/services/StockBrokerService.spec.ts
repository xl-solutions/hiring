import { FakeStockBrokerService } from './fakes/FakeStockBrokerService';

const stockBrokerService = new FakeStockBrokerService();

describe('Quotes from stock broker', () => {
	it('should return recent quotes by simbol', async () => {
		const response = await stockBrokerService.getRecentQuoteBySymbol(
			'IBM'
		);

		expect(response).toMatchObject({
			name: 'IBM',
			lastPrice: expect.any(Number),
			pricedAt: expect.any(Date)
		});
	});

	it('should get prices history quotes between with two dates', async () => {

		const response = await stockBrokerService.getPriceHistoryWithDates(
			'IBM',
			{ from: '2022-05-05', to: '2022-05-06' }
		);

		expect(response).toMatchObject({
			name: 'IBM',
			prices: expect.arrayContaining([{
				opening: expect.any(Number),
				high: expect.any(Number),
				low: expect.any(Number),
				closing: expect.any(Number),
				pricedAt: expect.any(Date)
			}])
		});
	});

	it('should not be able to get prices history with incorrect start date', async () => {

		await expect(stockBrokerService.getPriceHistoryWithDates(
			'IBM',
			{ from: 'invalidDate', to: '2022-05-06' }
		)).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to get prices history with incorrect end date', async () => {

		await expect(stockBrokerService.getPriceHistoryWithDates(
			'IBM',
			{ from: '2022-05-05', to: 'invalidDate' }
		)).rejects.toBeInstanceOf(Error);
	});

	it('should return an array of prices by symbols', async () => {
		const stocks = ['TIMP3.SA'];

		const response = await stockBrokerService.compareQuoteBetweenSymbols(
			'IBM',
			stocks
		);

		expect(response).toMatchObject({
			lastPrices: expect.arrayContaining([
				{
					name: 'IBM',
					lastPrice: expect.any(Number),
					pricedAt: expect.any(String)
				},
				{
					name: 'TIMP3.SA',
					lastPrice: expect.any(Number),
					pricedAt: expect.any(String)
				}
			])
		});
	});

	it('should get earning projection by purchase amount and date', async () => {
		const response = await stockBrokerService.getEarningsProjection(
			'IBM',
			{ purchasedAmount: '250', purchasedAt: '2022-05-05' }
		);

		expect(response).toMatchObject({
			name: 'IBM',
			purchasedAmount: expect.any(Number),
			purchasedAt: expect.any(Date),
			priceAtDate: expect.any(Number),
			lastPrice: expect.any(Number),
			capitalGains: expect.any(Number)
		});
	});

	it('should not be able to get earning projection with incorrect purchasedAt date', async () => {

		await expect(stockBrokerService.getEarningsProjection(
			'IBM',
			{ purchasedAmount: '250', purchasedAt: 'invalidDate' }
		)).rejects.toBeInstanceOf(Error);
	});
});
