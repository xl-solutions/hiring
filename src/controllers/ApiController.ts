import { AlphaVantageApiService } from '../services/AlphaVantageApiService';
import { YahooApiService } from '../services/YahooApiService';
import { BaseError } from '../utils/errors/BaseError';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { UnknownError } from '../utils/errors/UnknownError';
import { ControllerSuccess } from '../utils/types/ControllerResponses/ControllerSuccess';
import {
  CompareStockBySymbols,
  GetProjectedGains,
  GetStockBySymbol,
  GetStockHistoryBySymbol,
  HistoricPrices,
} from '../utils/types/EndpointsTypes';
import { ParameterValidator } from '../utils/validations/ParameterValidator';
import { ValidatationTypes } from '../utils/validations/Validators';

export class ApiController {
  static instance: ApiController;

  private constructor(
    private yahooApiService = new YahooApiService(),
    private alphaApiService: AlphaVantageApiService = new AlphaVantageApiService()
  ) {}

  static getInstance(yahooApiService?: YahooApiService): ApiController {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController(yahooApiService);
    }
    return ApiController.instance;
  }

  async getStockBySymbol(stock_name: string): Promise<ControllerSuccess<GetStockBySymbol> | BaseError[]> {
    const validationErrors = ParameterValidator.getValidationErrors([ValidatationTypes.STRING, { stock_name }]);
    if (validationErrors !== undefined) {
      return validationErrors;
    }

    try {
      const result = await this.yahooApiService.getStockBySymbol(stock_name);

      return new ControllerSuccess({
        name: result.symbol,
        lastPrice: result.regularMarketPrice,
        pricedAt: new Date(Number(result.regularMarketTime.toString() + '000')).toISOString(),
      });
    } catch (err: any) {
      if (err.code === 'Not Found') {
        return [new NotFoundError({ stock_name })];
      } else {
        return [new UnknownError()];
      }
    }
  }

  async compareStockBySymbols(
    stock_name: string,
    stocks: string[]
  ): Promise<ControllerSuccess<CompareStockBySymbols> | BaseError[]> {
    //no need for validation, getstockbysymbol already does it.
    const stocksArray = [stock_name, ...stocks];
    const successArray: GetStockBySymbol[] = [];
    const errorArray: BaseError[] = [];

    for (const stock of stocksArray) {
      const result = await this.getStockBySymbol(stock);

      if (result instanceof ControllerSuccess) {
        successArray.push(result.getResult());
      } else {
        errorArray.push(...result);
      }
    }

    const hasAnyErrors = errorArray.length > 0;
    if (hasAnyErrors) return errorArray;

    return new ControllerSuccess({ lastPrices: successArray });
  }

  async getStockHistoryBySymbol(
    stock_name: string,
    from: string,
    to: string
  ): Promise<ControllerSuccess<GetStockHistoryBySymbol> | BaseError[]> {
    const validationErrors = ParameterValidator.getValidationErrors(
      [ValidatationTypes.STRING, { stock_name }],
      [ValidatationTypes.DATE, { from }],
      [ValidatationTypes.DATE, { to }],
      [ValidatationTypes.IS_NOT_HOLIDAY, { from }],
      [ValidatationTypes.IS_NOT_HOLIDAY, { to }],
      [ValidatationTypes.NOT_TODAY_OR_AFTER, { from }],
      [ValidatationTypes.NOT_TODAY_OR_AFTER, { to }],
      [ValidatationTypes.DATE_INTERVAL, { from_to: [from, to] }]
    );

    if (validationErrors !== undefined) {
      return validationErrors;
    }

    return this.alphaApiService
      .getStockLimitedHistoryBySymbol(stock_name)
      .then(async (result) => {
        /**
         * - The stream containing the result is displayed decreassingly, like this
         * "2022-01-03": { ... }, "2022-01-02": { ... }, "2022-01-01": { ... }
         *
         * - We can notice that the "to" date is always the first to appear since it is, by
         * definition, earlier than the "from" one.
         * - So my strategy here is to read the stream line by line, and ignore it,  until the
         * "to" date has been found.
         * - After that, we can start reading ( adding the lines to a string ) until we find
         * the the "from" date.
         * - And then, we can start ending ( adding the last object to the string ) end the stream.
         *
         * We then convert the string to a JSON Object and there you have it.
         **/

        let reading = false;
        let ending = false;
        let stringResult = '{';
        const toDate = new Date(to).toISOString().split('T')[0];
        const fromDate = new Date(from).toISOString().split('T')[0];

        result.on('data', (lineBuffer: Buffer) => {
          const line = lineBuffer.toString();

          const hasError = line.includes('Error Message');
          if (hasError) {
            result.pause();
          }

          const isTheStartOfToObject: boolean = line.includes(toDate) && line.includes('{'); // "date": {

          if (isTheStartOfToObject) {
            reading = true;
          }

          if (!reading) {
            return; //ignore
          }

          const isTheStartOfFromObject: boolean = line.includes(fromDate) && line.includes('{'); // "date": {

          if (isTheStartOfFromObject) {
            ending = true;
          }

          if (reading) {
            stringResult += line;
          }

          const isEndOfTheLastObject: boolean = ending && line.includes('},');
          if (isEndOfTheLastObject) {
            //removing last comma
            stringResult = stringResult.slice(0, -1);
            result.pause();
          }
        });

        return new Promise<ControllerSuccess<GetStockHistoryBySymbol> | BaseError[]>((resolve, _) => {
          result.on('pause', () => {
            stringResult += '}';

            const hasError = stringResult === '{}';
            if (hasError) {
              resolve([new NotFoundError({ stock_name })]);
            } else {
              const rawPricesObj = JSON.parse(stringResult);

              const pricesObj: HistoricPrices[] = Object.keys(rawPricesObj).map((key) => {
                const saidObj = rawPricesObj[key];
                return {
                  opening: Number(saidObj['1. open']),
                  high: Number(saidObj['2. high']),
                  low: Number(saidObj['3. low']),
                  closing: Number(saidObj['4. close']),
                  pricedAt: new Date(key).toISOString(),
                };
              });

              resolve(
                new ControllerSuccess<GetStockHistoryBySymbol>({
                  name: stock_name.toUpperCase(),
                  prices: pricesObj,
                })
              );
            }
          });
          result.on('end', () => {
            resolve([new NotFoundError({ from }), new NotFoundError({ to })]);
          });
        });
      })
      .catch(() => {
        return [new UnknownError()];
      });
  }

  async projectGains(
    stock_name: string,
    purchasedAmount: string,
    purchasedAt: string
  ): Promise<ControllerSuccess<GetProjectedGains> | BaseError[]> {
    const validationErrors = ParameterValidator.getValidationErrors(
      [ValidatationTypes.STRING, { stock_name }],
      [ValidatationTypes.POSITIVE_NUMBER, { purchasedAmount }],
      [ValidatationTypes.DATE, { purchasedAt }],
      [ValidatationTypes.IS_NOT_HOLIDAY, { purchasedAt }],
      [ValidatationTypes.NOT_TODAY_OR_AFTER, { purchasedAt }]
    );

    if (validationErrors !== undefined) {
      return validationErrors;
    }

    const [todaysValue, onDateValue] = await Promise.all([
      this.getStockBySymbol(stock_name),
      this.getStockHistoryBySymbol(stock_name, purchasedAt, purchasedAt),
    ]);
    let totalToday = undefined,
      totalOnDate = undefined;

    if (todaysValue instanceof ControllerSuccess) {
      totalToday = todaysValue.getResult().lastPrice * Number(purchasedAmount);
    } else {
      // The only case where there's two errors is when date is not found (to and from)
      // In that case, im remodeling the error so it doesnt show as a weird "unknown to and from"
      // parameter that the user have never sended.
      const didNotFindDate = todaysValue[0] instanceof NotFoundError && todaysValue.length === 2;
      if (didNotFindDate) {
        return [new NotFoundError({ purchasedAt })];
      }
      return todaysValue;
    }

    if (onDateValue instanceof ControllerSuccess) {
      totalOnDate = onDateValue.getResult().prices[0].closing * Number(purchasedAmount);
    } else {
      //same thing
      const didNotFindDate = onDateValue[0] instanceof NotFoundError && onDateValue.length === 2;
      if (didNotFindDate) {
        return [new NotFoundError({ purchasedAt })];
      }
      return onDateValue;
    }

    todaysValue.getResult().pricedAt;
    return new ControllerSuccess({
      name: stock_name.toUpperCase(),
      lastPrice: todaysValue.getResult().lastPrice,
      priceAtDate: onDateValue.getResult().prices[0].closing,
      purchasedAmount: Number(purchasedAmount),
      purchasedAt: new Date(purchasedAt).toISOString(),
      capitalGains: Number((totalToday - totalOnDate).toFixed(2)),
    });
  }
}
