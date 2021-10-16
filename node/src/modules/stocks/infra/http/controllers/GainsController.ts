import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GainsService from '@modules/stocks/services/GainsService';

interface IRequest extends Request {
  query: {
    purchasedAmount: string;
    purchasedAt: string;
  };
  params: {
    stock_name: string;
  };
}

export default class GainsController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const req = <IRequest>(<unknown>request);
    const { stock_name } = req.params;
    const { purchasedAmount, purchasedAt } = req.query;

    const gainsService = container.resolve(GainsService);
    const gains = await gainsService.execute({
      stock_name,
      purchasedAmount,
      purchasedAt,
    });

    return response.json(classToClass(gains));
  }
}
