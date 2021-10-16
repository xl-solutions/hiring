import { Router } from 'express';
import stockRouter from '@modules/stocks/infra/http/routes/stock.routes';

const routes = Router();

routes.use(
  '/stocks',
  stockRouter,
);

export default routes;
