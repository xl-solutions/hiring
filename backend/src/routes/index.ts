import { Router } from 'express';

import stocksRouter from './stocks.routes';

const routes = Router();

routes.use('/stocks', stocksRouter);

export default routes;
