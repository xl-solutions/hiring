import express from 'express';
import cors from 'cors';
import axios, { AxiosError } from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

//thats dumb...
interface YahooApiReponseResult {
  symbol: string;
  response: YahooApiResponseResponse[];
}

interface YahooApiResponseResponse {
  meta: {
    regularMarketTime: number;
    regularMarketPrice: number;
  };
}

interface YahooApiResponse {
  spark: {
    result: YahooApiReponseResult[];
    error: {
      code: string;
      description: string;
    };
  };
}

app.get('/getprecoAtual', async ({ body: { stock_name } }, res) => {
  console.log(stock_name);

  try {
    const {
      data: {
        spark: { result },
      },
    } = await axios.get<YahooApiResponse>(
      `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${stock_name}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`
    );

    if (result) {
      const { regularMarketPrice, regularMarketTime } = result[0].response[0].meta!;
      res.send({
        name: result[0].symbol,
        lastPrice: regularMarketPrice,
        pricedAt: new Date(Number(regularMarketTime.toString() + '000')).toISOString(),
      });
    }
  } catch (error: any) {
    const errorObj = error.response.data.spark.error;
    res.send(errorObj);
  }
});

app.listen(3000);
