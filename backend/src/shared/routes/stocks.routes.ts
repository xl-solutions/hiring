import { Router } from 'express';
import { CompareStocksController } from '../../modules/stocks/useCases/compareStocks/CompareStocksController';
import { GainsByPurchaseOnSpecificDateController } from '../../modules/stocks/useCases/gainsByPurchaseOnSpecificDate/GainsByPurchaseOnSpecificDateController';
import { GetLastQuoteController } from '../../modules/stocks/useCases/getLastQuote/GetLastQuoteController';
import { HistoricalPriceByDateController } from '../../modules/stocks/useCases/historicalPriceByDate/HistoricalPriceByDateController';
import { SearchStocksController } from '../../modules/stocks/useCases/searchStocks/SearchStocksController';

const stocksRoutes = Router();

const getLastQuoteController = new GetLastQuoteController();
const historicalPriceByDateController = new HistoricalPriceByDateController();
const compareStocksController = new CompareStocksController();
const gainsByPurchasesController =
  new GainsByPurchaseOnSpecificDateController();
const searchStocksController = new SearchStocksController();

stocksRoutes.get('/:stock_name/quote', getLastQuoteController.handle);
stocksRoutes.get(
  '/:stock_name/history',
  historicalPriceByDateController.handle,
);
stocksRoutes.get('/:stock_name/gains', gainsByPurchasesController.handle);
stocksRoutes.get('/search', searchStocksController.handle);
stocksRoutes.post('/:stock_name/compare', compareStocksController.handle);

export { stocksRoutes };
