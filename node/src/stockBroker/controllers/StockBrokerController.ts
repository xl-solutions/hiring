import { Request, Response } from 'express';

import { StockBrokerService } from '../services/StockBrokerService';

const stockBrokerService = new StockBrokerService();

export class StockBrokerController {
	async getRecentQuote(req: Request, res: Response) {
		const { stock_name } = req.params;

		const recentQuote = await stockBrokerService.getRecentQuoteBySymbol(
			stock_name
		);

		return res.json(recentQuote);
	}

	async getPriceHistoryBetweenDates(req: Request, res: Response) {
		const { stock_name } = req.params;
		const { to, from } = req.query;

		const priceHistory = await stockBrokerService.getPriceHistoryWithDates(
			stock_name,
			{ to, from }
		);

		return res.json(priceHistory);
	}

	async compareQuotesBetweenSymbols(req: Request, res: Response) {
		const { stock_name } = req.params;
		const { stocks } = req.body;

		const comparedQuotes = await stockBrokerService.compareQuoteBetweenSymbols(
			stock_name,
			stocks
		);

		return res.json(comparedQuotes);
	}
}
