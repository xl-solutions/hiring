import express from 'express';
import cors from 'cors';
import v1StockRouter from './src/api/v1/routers/StockRouter';
import { ApiController } from './src/controllers/ApiController';
import { ApiResponseFactory } from './src/utils/types/ApiResponse/ApiResponseFactory';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/stocks', v1StockRouter);

app.listen(3000);
// const service = new AlphaVantageApiService();
// service.getStockLimitedHistoryBySymbol('ibm', new Date('2022-10-03T03:00:00.000Z'), new Date(Date.now()));
