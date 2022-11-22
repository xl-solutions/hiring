import { Router } from 'express';
import { ApiController } from '../../../controllers/ApiController';
import { ApiResponseFactory } from '../../../utils/types/ApiResponse/ApiResponseFactory';
const stockRouter = Router();

const controller = ApiController.getInstance();

stockRouter.get('/:stock_name', async ({ params: { stock_name = '' } }, res) => {
  const result = await controller.getStockBySymbol(stock_name);
  const apiResponse = ApiResponseFactory.createResponseInstance(result);

  res.status(apiResponse.getStatusCode()).send(apiResponse);
});

stockRouter.get('/:stock_name/compare', async ({ body: { stocks }, params: { stock_name = '' } }, res) => {
  const result = await controller.compareStockBySymbol(stock_name, stocks);
  // const apiResponse = ApiResponseFactory.createResponseInstance(result);

  res.send('Done');
});

export default stockRouter;
