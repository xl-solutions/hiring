import express from 'express';
import cors from 'cors';
import { ApiController } from './src/controllers/ApiController';
import { ApiResponse } from './src/utils/types/ApiResponseFactory';

const app = express();

app.use(express.json());
app.use(cors());

//Calling this here isents me of creating a controller instance in every api call
const controller = new ApiController();

app.get('/stocks/:stock_name', async ({ params: { stock_name = '' } }, res) => {
  const result = await controller.getStockBySymbol(stock_name);
  const apiResponse = new ApiResponse(result);

  res.status(apiResponse.getStatusCode()).send(apiResponse);
});

app.listen(3000);
