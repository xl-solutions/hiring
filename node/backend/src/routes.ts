import { Router } from 'express';

import { stockBrokerRouter } from './stockBroker/routes/stockBroker.routes';

export const routes = Router();

routes.use('/stocks', stockBrokerRouter);
