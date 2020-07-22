import { Request, Response } from 'express';

import StockInfoService from '../services/StockInfoService';
import StockHistoryService from '../services/StockHistoryService';
import StockCompareService from '../services/StockCompareService';
import StockGainsService from '../services/StockGainsService';

class StockController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { stock_name } = request.params;

    const stockInfoService = new StockInfoService();
    const stockInfo = await stockInfoService.execute({ stock_name });

    return response.json(stockInfo);
  }

  public async showHistory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { stock_name } = request.params;
    const { from, to } = request.query;

    const stockHistoryService = new StockHistoryService();
    const stockHistory = await stockHistoryService.execute({
      stock_name,
      from: String(from),
      to: String(to),
    });

    return response.json(stockHistory);
  }

  public async compare(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { stock_name } = request.params;
    const { stocks } = request.body;

    const stockCompareService = new StockCompareService();
    const lastPrices = await stockCompareService.execute({
      stock_name,
      stocks,
    });

    return response.json(lastPrices);
  }

  public async gains(request: Request, response: Response) {
    const { stock_name } = request.params;
    const { purchasedAmount, purchasedAt } = request.query;

    const stockGainsService = new StockGainsService();
    const gains = await stockGainsService.execute({
      stock_name,
      purchasedAt: String(purchasedAt),
      purchasedAmount: Number(purchasedAmount),
    });

    return response.json(gains);
  }
}

export default StockController;
