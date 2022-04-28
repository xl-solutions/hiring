import Router from 'express';
import homeRoute from './HomeRoute.js';
import stocksRoute from './StocksRoute.js';

const router = Router();

router.use('/', homeRoute);
router.use('/stocks', stocksRoute);


export default router;
