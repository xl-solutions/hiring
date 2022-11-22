import express from 'express';
import cors from 'cors';
import { ApiController } from './src/controllers/ApiController';
import { ApiResponseFactory } from './src/utils/types/ApiResponse/ApiResponseFactory';
import v1StockRouter from './src/api/v1/routers/StockRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.use('v1/stocks', v1StockRouter);

app.listen(3000);
