import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CompareService from '@modules/stocks/services/CompareService';

interface IRequest extends Request {
  params: {
    stock_name: string;
  };
  stocks: string[];
}

export default class CompareController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const req = <IRequest>(<unknown>request);
    let { stock_name } = req.params;
    let { stocks } = req.body;
    console.log(stocks);

    const compareService = container.resolve(CompareService);
    const compare = await compareService.execute({ stock_name, stocks });

    return response.json(classToClass(compare));
  }
}
