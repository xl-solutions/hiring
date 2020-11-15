import { Injectable, HttpService } from '@nestjs/common';

import * as config from 'config';

import { NOT_FOUND_QUOTE } from 'src/constants';
import NotFoundException from 'src/utils/exceptions/not-found';
import { Quote, ServerConfig, GlobalQuote } from 'src/interfaces';

@Injectable()
export class CompareStocksService {
  constructor(private httpService: HttpService) {}

  private parseData(data: GlobalQuote['Global Quote'][]): Quote[] {
    return data.reduce((list: Quote[], item) => {
      list = [
        ...list,
        {
          name: item['01. symbol'],
          lastPrice: item['05. price'],
          pricedAt: item['07. latest trading day'],
        },
      ] as Quote[];
      return list;
    }, []);
  }

  private async getQuote(stockName: string): Promise<GlobalQuote> {
    const {
      stockApi: { url, apiKey },
    } = config.get<ServerConfig>('config');

    const response = await this.httpService
      .get(
        `${url}/query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${apiKey}`,
      )
      .toPromise();

    if (
      !response.data['Global Quote'] ||
      !Object.keys(response.data['Global Quote']).length
    )
      NotFoundException(NOT_FOUND_QUOTE);

    return response.data;
  }

  public async execute(
    stockName: string,
    stockNames: string[],
  ): Promise<{ lastPrices: Quote[] }> {
    const stocks: GlobalQuote['Global Quote'][] = [];

    const quoteToCompare = await this.getQuote(stockName);

    for await (const stock of stockNames) {
      const quote = await this.getQuote(stock);
      stocks.push(quote['Global Quote']);
    }

    return {
      lastPrices: this.parseData([quoteToCompare['Global Quote'], ...stocks]),
    };
  }
}
