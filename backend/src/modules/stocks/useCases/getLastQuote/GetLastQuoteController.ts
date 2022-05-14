import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetLastQuoteUseCase } from './GetLastQuoteUseCase';

export class GetLastQuoteController {
  async handle(request: Request, response: Response) {
    const { stock_name } = request.params;

    const getLastQuoteUseCase = container.resolve(GetLastQuoteUseCase);

    const result = await getLastQuoteUseCase.execute({ stock_name });

    return response.status(200).json(result);
  }
}
