import { injectable, inject } from 'tsyringe';
import { container } from 'tsyringe';
import QuotesService from '@modules/stocks/services/QuotesService';
import { IQuotesDTO } from '@modules/stocks/entities/IQuotesDTO';
import { ICompare, IRequest } from '@modules/stocks/entities/ICompareDTO';

interface IResponse {
  lastPrices: IQuotesDTO[];
}

@injectable()
class CompareService implements ICompare {
  public async execute({ stock_name, stocks }: IRequest): Promise<IResponse> {
    const quotesService = container.resolve(QuotesService);

    let lastPrices: IQuotesDTO[] = [];

    for (let i = 0; i < stocks.length; i++) {
      const quote = await quotesService.execute({ stock_name: stocks[i] });
      lastPrices.push(quote);
    }

    return { lastPrices };
  }
}

export default CompareService;
