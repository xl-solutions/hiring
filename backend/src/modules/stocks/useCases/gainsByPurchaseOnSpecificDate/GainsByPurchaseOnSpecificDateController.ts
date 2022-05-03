import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GainsByPurchaseOnSpecificDateUseCase } from './GainsByPurchaseOnSpecificDateUseCase';

export class GainsByPurchaseOnSpecificDateController {
  async handle(request: Request, response: Response) {
    const { stock_name } = request.params;
    const { purchasedAmount, purchasedAt } = request.query;

    const earningsByPurchaseOnSpecificDateUseCase = container.resolve(
      GainsByPurchaseOnSpecificDateUseCase,
    );

    const result = await earningsByPurchaseOnSpecificDateUseCase.execute({
      stock_name,
      purchasedAmount: Number(purchasedAmount),
      purchasedAt: purchasedAt as string,
    });

    return response.status(200).json(result);
  }
}
