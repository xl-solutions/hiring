import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import StocksController from '../controllers/StocksController';

const stocksRouter = Router();

const stocksController = new StocksController();

stocksRouter.get(
  '/:stock_name/quote',
  celebrate({
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
  }),
  stocksController.show,
);

stocksRouter.get(
  '/:stock_name/history',
  celebrate({
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
    [Segments.QUERY]: {
      from: Joi.string().required(),
      to: Joi.string().required(),
    },
  }),
  stocksController.showHistory,
);

stocksRouter.get(
  '/:stock_name/gains',
  celebrate({
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
    [Segments.QUERY]: {
      purchasedAmount: Joi.number().required(),
      purchasedAt: Joi.string().required(),
    },
  }),
  stocksController.gains,
);

stocksRouter.post(
  '/:stock_name/compare',
  celebrate({
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
    [Segments.BODY]: {
      stocks: Joi.array().required(),
    },
  }),
  stocksController.compare,
);

export default stocksRouter;
