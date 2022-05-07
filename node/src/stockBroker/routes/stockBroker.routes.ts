import { Router } from 'express';

import { StockBrokerController } from '../controllers/StockBrokerController';

export const stockBrokerRouter = Router();

const stockBrokerController = new StockBrokerController();

stockBrokerRouter.get(
	'/:stock_name/quote',
	stockBrokerController.getRecentQuote
);

stockBrokerRouter.get(
	'/:stock_name/history',
	stockBrokerController.getPriceHistoryBetweenDates
);
