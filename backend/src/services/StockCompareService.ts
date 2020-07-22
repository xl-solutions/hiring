import StockInfoService from './StockInfoService';

interface Request {
  stock_name: string;
  stocks: string[];
}

interface StockInfo {
  name: string;
  lastPrice: number;
  priceAt: string;
}

interface Response {
  lastPrices: StockInfo[];
}

class StockCompareService {
  public async execute({ stock_name, stocks }: Request): Promise<Response> {
    const stockInfoService = new StockInfoService();

    const lastPrices: StockInfo[] = [];

    const mainStockPrice = await stockInfoService.execute({ stock_name });
    lastPrices.push(mainStockPrice);

    for (const stock of stocks) {
      const lastPrice = await stockInfoService.execute({ stock_name: stock });

      lastPrices.push(lastPrice);
    }

    return {
      lastPrices,
    };
  }
}

export default StockCompareService;
