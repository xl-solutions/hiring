import { Router } from 'express';
import { ApiController } from '../../../controllers/ApiController';
import { ApiResponseFactory } from '../../../utils/types/ApiResponse/ApiResponseFactory';
const stockRouter = Router();

const controller = ApiController.getInstance();

stockRouter.get('/:stock_name/quote', async ({ params: { stock_name = '' } }, res) => {
  const result = await controller.getStockBySymbol(stock_name);
  const apiResponse = ApiResponseFactory.createResponseInstance(result);

  res.status(apiResponse.getStatusCode()).send(apiResponse);
});

stockRouter.get('/:stock_name/compare', async ({ body: { stocks }, params: { stock_name = '' } }, res) => {
  const result = await controller.compareStockBySymbols(stock_name, stocks);
  const apiResponse = ApiResponseFactory.createResponseInstance(result);

  res.status(apiResponse.getStatusCode()).send(apiResponse);
});

stockRouter.get('/:stock_name/compare', async ({ body: { stocks }, params: { stock_name = '' } }, res) => {
  const result = await controller.compareStockBySymbols(stock_name, stocks);
  const apiResponse = ApiResponseFactory.createResponseInstance(result);

  res.status(apiResponse.getStatusCode()).send(apiResponse);
});

stockRouter.get('/:stock_name/history', async ({ params: { stock_name = '' }, query: { from = '', to = '' } }, res) => {
  const result = await controller.getStockHistoryBySymbol(stock_name, from.toString(), to.toString());
  const apiResponse = ApiResponseFactory.createResponseInstance(result);

  res.status(apiResponse.getStatusCode()).send(apiResponse);
});

stockRouter.get(
  '/:stock_name/gains',
  async ({ params: { stock_name = '' }, query: { purchasedAmount = '', purchasedAt = '' } }, res) => {
    const result = await controller.projectGains(stock_name, purchasedAmount.toString(), purchasedAt.toString());
    const apiResponse = ApiResponseFactory.createResponseInstance(result);

    res.status(apiResponse.getStatusCode()).send(apiResponse);
  }
);

export default stockRouter;
