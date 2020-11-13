import { Injectable, HttpService } from '@nestjs/common';

import * as config from 'config';

import isDateValid from 'src/utils/dates/dates.validator';
import NotFoundException from 'src/utils/exceptions/not-found';
import BadRequestException from 'src/utils/exceptions/bad-request';
import { ServerConfig, QuoteHistoryData, Projection } from 'src/interfaces';
import {
  INVALID_DATE,
  NOT_FOUND_QUOTE,
  QUOTATION_NOT_FOUND,
} from 'src/constants';

@Injectable()
export class StockGainService {
  constructor(private httpService: HttpService) {}

  private async getDolarToBRL(): Promise<number> {
    const {
      awesomeapi: { url },
    } = config.get<ServerConfig>('config');

    const response = await this.httpService.get(url).toPromise();

    if (!response.data) BadRequestException(QUOTATION_NOT_FOUND);

    return Number(response.data[0]?.ask);
  }

  private async parseData(
    data: any,
    stockName: string,
    purchasedAmount: number,
    purchasedAt: string,
  ): Promise<Projection> {
    const purchasedDate = new Date(purchasedAt);

    if (!isDateValid(purchasedDate)) {
      BadRequestException(INVALID_DATE);
    }

    const lastPrice = Number(data[Object.keys(data)[0]]['4. close']);
    const dolarBRL = await this.getDolarToBRL();

    const oldAmount = purchasedAmount * Number(data[purchasedAt]['4. close']);
    const currentAmout = purchasedAmount * lastPrice;

    return {
      name: stockName,
      purchasedAmount,
      purchasedAt: purchasedDate.toISOString(),
      priceAtDate: Number(data[purchasedAt]['4. close']),
      capitalGains: Number(((currentAmout - oldAmount) * dolarBRL).toFixed(2)),
      lastPrice: lastPrice,
    };
  }

  public async execute(
    stockName: string,
    purchasedAmount: number,
    purchasedAt: string,
  ): Promise<Projection> {
    const {
      stockApi: { url, apiKey },
    } = config.get<ServerConfig>('config');

    const quoteHistoryData = await this.httpService
      .get<QuoteHistoryData>(
        `${url}/query?function=TIME_SERIES_DAILY&symbol=${stockName}&outputsize=full&apikey=${apiKey}`,
      )
      .toPromise();

    if (quoteHistoryData?.data['Error Message'])
      NotFoundException(NOT_FOUND_QUOTE);

    const data = quoteHistoryData.data['Time Series (Daily)'];

    return this.parseData(data, stockName, purchasedAmount, purchasedAt);
  }
}
