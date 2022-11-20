import express from 'express';
import cors from 'cors';
import { ApiService } from './src/services/ApiService';
import { ApiController } from './src/controllers/ApiController';

const app = express();

app.use(express.json());
app.use(cors());

//Calling this here isents me of creating a controller instance in every api call
const controller = new ApiController();

app.get('/stocks/:stock_name', async ({ params: { stock_name } }, res) => {
  res.send(await controller.getStockBySymbol(stock_name));
  // try {
  //   const {
  //     data: {
  //       spark: { result },
  //     },
  //   } = await axios.get<YahooApiResponse>(
  //     `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${stock_name}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`
  //   );

  //   if (result) {
  //     const { regularMarketPrice, regularMarketTime } = result[0].response[0].meta!;
  //     res.send({
  //       name: result[0].symbol,
  //       lastPrice: regularMarketPrice,
  //       pricedAt: new Date(Number(regularMarketTime.toString() + '000')).toISOString(),
  //     });
  //   }
  // } catch (error: any) {
  //   const errorObj = error.response.data.spark.error;
  //   res.send(errorObj);
  // }
});

app.listen(3000);
