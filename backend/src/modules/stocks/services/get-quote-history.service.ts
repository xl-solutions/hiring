import { Injectable, HttpService } from '@nestjs/common';

import * as config from 'config';

import { QuoteHistoryData } from 'src/interfaces';
import isDateValid from 'src/utils/dates/dates.validator';
import { NOT_FOUND_QUOTE, INVALID_DATE } from 'src/constants';
import NotFoundException from 'src/utils/exceptions/not-found';
import BadRequestException from 'src/utils/exceptions/bad-request';
import { Pricing, QuoteHistory, ServerConfig } from 'src/interfaces';

@Injectable()
export class GetQuoteHistoryService {
  constructor(private httpService: HttpService) {}

  private parseData(data: any, from: Date, to: Date): Pricing[] {
    const parsedData = Object.keys(data)
      .filter(date => new Date(date) >= from && new Date(date) <= to)
      .reduce((list, item) => {
        list = [
          ...list,
          {
            opening: Number(data[item]['1. open']),
            high: Number(data[item]['2. high']),
            low: Number(data[item]['3. low']),
            closing: Number(data[item]['4. close']),
            pricedAt: new Date(item).toISOString(),
          },
        ];
        return list;
      }, []);
    return parsedData;
  }

  public async execute(
    stockName: string,
    from: string,
    to: string,
  ): Promise<QuoteHistory> {
    const {
      stockApi: { url, apiKey },
    } = config.get<ServerConfig>('config');

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (!isDateValid(fromDate) || !isDateValid(toDate)) {
      BadRequestException(INVALID_DATE);
    }

    const quoteHistoryData = await this.httpService
      .get<QuoteHistoryData>(
        `${url}/query?function=TIME_SERIES_DAILY&symbol=${stockName}&outputsize=full&apikey=${apiKey}`,
      )
      .toPromise();

    if (quoteHistoryData?.data['Error Message'])
      NotFoundException(NOT_FOUND_QUOTE);

    const data = quoteHistoryData.data['Time Series (Daily)'];

    return {
      name: stockName,
      prices: this.parseData(data, fromDate, toDate),
    };
  }
}
