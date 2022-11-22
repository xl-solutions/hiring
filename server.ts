import express from 'express';
import cors from 'cors';
import v1StockRouter from './src/api/v1/routers/StockRouter';
import { NotFoundError } from './src/utils/errors/NotFoundError';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/stocks', v1StockRouter);

app.listen(3000);
