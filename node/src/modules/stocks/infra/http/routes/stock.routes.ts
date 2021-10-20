import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import HistoryController from '@modules/stocks/infra/http/controllers/HistoryController';
import QuotesController from '@modules/stocks/infra/http/controllers/QuotesController';
import GainsController from '@modules/stocks/infra/http/controllers/GainsController';
import CompareController from '@modules/stocks/infra/http/controllers/CompareController';
import { ISO8601 } from '@shared/utils/validate';

const historyController = new HistoryController();
const quotesController = new QuotesController();
const gainsController = new GainsController();
const compareController = new CompareController();
const stockRouter = Router();

stockRouter.get(
  '/:stock_name/history',
  celebrate({
    [Segments.QUERY]: {
      to: Joi.string().regex(ISO8601).required(),
      from: Joi.string().regex(ISO8601).required(),
    },
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
  }),
  historyController.create,
);

stockRouter.get(
  '/:stock_name/quotes',
  celebrate({
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
  }),
  quotesController.create,
);

stockRouter.get(
  '/:stock_name/gains',
  celebrate({
    [Segments.QUERY]: {
      purchasedAt: Joi.string().regex(ISO8601),
      purchasedAmount: Joi.string(),
    },
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
  }),
  gainsController.create,
);

stockRouter.post(
  '/:stock_name/compare',
  celebrate({
    [Segments.BODY]: {
      stocks: Joi.array().items(Joi.string()),
    },
    [Segments.PARAMS]: {
      stock_name: Joi.string().required(),
    },
  }),
  compareController.create,
);

export default stockRouter;
