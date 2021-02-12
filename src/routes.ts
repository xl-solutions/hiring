import { Request, Response, Router } from 'express';
import stocksController from './controllers/stocksController';

const routes = Router();

routes.get('/stocks/:stock_name/quote', stocksController.quote)
routes.get('/stocks/:stock_name/history', stocksController.history)
routes.get('/stocks/:stock_name/compare', stocksController.compare)
routes.get('/stocks/:stock_name/gains', stocksController.gains)

export default routes;