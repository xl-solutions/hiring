import { Router } from 'express';
import { GetLastQuoteController } from '../../modules/stocks/useCases/getLastQuote/GetLastQuoteController';

const stocksRoutes = Router();

const getLastQuoteController = new GetLastQuoteController();

stocksRoutes.get('/:stock_name/quote', getLastQuoteController.handle);

export { stocksRoutes };
