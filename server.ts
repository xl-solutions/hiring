import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import v1StockRouter from './src/api/v1/routers/StockRouter';
import { requiredEnv } from './src/utils/Env';

dotenv.config();
requiredEnv(process.env.API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/v1/stocks', v1StockRouter);

console.log('\n\n\n\t\t🚀 To the moon! 🚀');
console.log('\tServer started at localhost:3000\n\n');

app.listen(3000);
