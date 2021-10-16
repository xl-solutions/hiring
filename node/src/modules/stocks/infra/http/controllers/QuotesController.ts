import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import QuotesService from '@modules/stocks/services/QuotesService';

interface IRequest extends Request {
  query: {
    to: string;
    from: string;
  };
  params: {
    stock_name: string;
  };
}

export default class QuotesController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const req = <IRequest>(<unknown>request);
    const { stock_name } = req.params;

    const quotesService = container.resolve(QuotesService);
    const quotes = await quotesService.execute({ stock_name });

    return response.json(classToClass(quotes));
  }
}
