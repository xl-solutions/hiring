import { Injectable, HttpService } from '@nestjs/common';

import * as config from 'config';

import { NOT_FOUND_QUOTE } from 'src/constants';
import NotFoundException from 'src/utils/exceptions/not-found';
import { Quote, ServerConfig, GlobalQuote } from 'src/interfaces';

@Injectable()
export class GetQuoteService {
  constructor(private httpService: HttpService) {}

  public async execute(stockName: string): Promise<Quote> {
    const {
      stockApi: { url, apiKey },
    } = config.get<ServerConfig>('config');

    const globalQuote = await this.httpService
      .get<GlobalQuote>(
        `${url}/query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${apiKey}`,
      )
      .toPromise();

    if (!Object.keys(globalQuote.data['Global Quote']).length)
      NotFoundException(NOT_FOUND_QUOTE);

    const data = globalQuote.data['Global Quote'];

    return {
      name: data['01. symbol'],
      lastPrice: Number(data['05. price']),
      pricedAt: new Date(data['07. latest trading day']).toISOString(),
    };
  }
}
