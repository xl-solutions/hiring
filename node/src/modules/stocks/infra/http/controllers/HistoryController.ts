import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import HistoryService from '@modules/stocks/services/HistoryService';

interface IRequest extends Request {
  query: {
    to: string;
    from: string;
  };
  params: {
    stock_name: string;
  };
}

export default class HistoryController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const req = <IRequest>(<unknown>request);
    const { stock_name } = req.params;
    const { to, from } = req.query;

    const historyService = container.resolve(HistoryService);
    const history = await historyService.execute({ stock_name, to, from });

    return response.json(classToClass(history));
  }
}
