import { Router } from 'express';
import { GetLastQuoteController } from '../../modules/stocks/useCases/getLastQuote/GetLastQuoteController';
import { HistoricalPriceByDateController } from '../../modules/stocks/useCases/historicalPriceByDate/HistoricalPriceByDateController';

const stocksRoutes = Router();

const getLastQuoteController = new GetLastQuoteController();
const historicalPriceByDateController = new HistoricalPriceByDateController();

stocksRoutes.get('/:stock_name/quote', getLastQuoteController.handle);
stocksRoutes.get(
  '/:stock_name/history',
  historicalPriceByDateController.handle,
);

export { stocksRoutes };
