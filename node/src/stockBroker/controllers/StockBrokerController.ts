import { Request, Response } from 'express';

import { StockBrokerService } from '../services/StockBrokerService';

const stockBrokerService = new StockBrokerService();

export class StockBrokerController {
	async getRecentQuote(req: Request, res: Response) {
		const { stock_name } = req.params;

		try {
			const recentQuote = await stockBrokerService.getRecentQuoteBySymbol(
				stock_name
			);

			return res.json(recentQuote);

		} catch (error) {
			res.status(400).send(
				`Favor verificar os dados inseridos, e tente novamente - ${error.message}`
			);
		}
	}

	async getPriceHistoryBetweenDates(req: Request, res: Response) {
		const { stock_name } = req.params;
		const { to, from } = req.query;

		try {
			const priceHistory = await stockBrokerService.getPriceHistoryWithDates(
				stock_name,
				{ to, from }
			);

			return res.json(priceHistory);

		} catch (error) {
			res.status(400).send(
				`Favor verificar os dados inseridos, e tente novamente - ${error.message}`
			);
		}
	}

	async compareQuotesBetweenSymbols(req: Request, res: Response) {
		const { stock_name } = req.params;
		const { stocks } = req.body;

		try {
			const comparedQuotes = await stockBrokerService.compareQuoteBetweenSymbols(
				stock_name,
				stocks
			);

			return res.json(comparedQuotes);

		} catch (error) {
			res.status(400).send(
				`Favor verificar os dados inseridos, e tente novamente - ${error.message}`
			);
		}
	}

	async getEarningsProjection(req: Request, res: Response) {
		const { stock_name } = req.params;
		const { purchasedAmount, purchasedAt } = req.query;

		try {
			const earningsProjection = await stockBrokerService.getEarningsProjection(
				stock_name,
				{
					purchasedAmount,
					purchasedAt
				}
			);

			return res.json(earningsProjection);

		} catch (error) {
			res.status(400).send(
				`Favor verificar os dados inseridos, e tente novamente - ${error.message}`
			);
		}
	}
}
