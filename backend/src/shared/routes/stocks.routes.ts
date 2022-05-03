import { Router } from 'express';
import { CompareStocksController } from '../../modules/stocks/useCases/compareStocks/CompareStocksController';
import { GetLastQuoteController } from '../../modules/stocks/useCases/getLastQuote/GetLastQuoteController';
import { HistoricalPriceByDateController } from '../../modules/stocks/useCases/historicalPriceByDate/HistoricalPriceByDateController';

const stocksRoutes = Router();

const getLastQuoteController = new GetLastQuoteController();
const historicalPriceByDateController = new HistoricalPriceByDateController();
const compareStocksController = new CompareStocksController();

stocksRoutes.get('/:stock_name/quote', getLastQuoteController.handle);
stocksRoutes.get(
  '/:stock_name/history',
  historicalPriceByDateController.handle,
);
stocksRoutes.post('/:stock_name/compare', compareStocksController.handle);

export { stocksRoutes };
