import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SearchStocksUseCase } from './SearchStocksUseCase';

export class SearchStocksController {
  async handle(request: Request, response: Response) {
    const { symbol } = request.query;

    const searchStocksUseCase = container.resolve(SearchStocksUseCase);

    const results = await searchStocksUseCase.execute({
      symbol: String(symbol),
    });

    return response.json(results);
  }
}
