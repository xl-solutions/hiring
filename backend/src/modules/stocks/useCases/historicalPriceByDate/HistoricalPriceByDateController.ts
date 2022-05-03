import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { HistoricalPriceByDateUseCase } from './HistoricalPriceByDateUseCase';

export class HistoricalPriceByDateController {
  async handle(request: Request, response: Response) {
    const { stock_name } = request.params;
    const { from, to } = request.query;

    const historicalPriceByDateUseCase = container.resolve(
      HistoricalPriceByDateUseCase,
    );

    const result = await historicalPriceByDateUseCase.execute({
      stock_name,
      from: from as string,
      to: to as string,
    });

    return response.status(200).json(result);
  }
}
