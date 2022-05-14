import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CompareStocksUseCase } from './CompareStocksUseCase';

export class CompareStocksController {
  async handle(request: Request, response: Response) {
    const { stock_name } = request.params;
    const { stocks } = request.body;

    const compareStocksUseCase = container.resolve(CompareStocksUseCase);

    const result = await compareStocksUseCase.execute({ stock_name, stocks });

    return response.status(200).json(result);
  }
}
