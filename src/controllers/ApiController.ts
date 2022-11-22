import { YahooApiService } from '../services/YahooApiService';
import { BaseError } from '../utils/errors/BaseError';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { UnknownError } from '../utils/errors/UnknownError';
// import { ControllerError, ErrorTypes } from '../utils/types/ControllerResponses/ControllerError';
import { ControllerSuccess } from '../utils/types/ControllerResponses/ControllerSuccess';
import { CompareStockBySymbols, GetStockBySymbol } from '../utils/types/EndpointsTypes';
import { YahooApiErrorObject } from '../utils/types/YahooApi/YahooApiTypes';
import { ParameterValidator } from '../utils/validations/ParameterValidator';
import { ValidatationTypes } from '../utils/validations/Validators';

export class ApiController {
  static instance: ApiController;

  private constructor(private apiService = new YahooApiService()) {}

  static getInstance(apiService?: YahooApiService): ApiController {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController(apiService);
    }
    return ApiController.instance;
  }

  async getStockBySymbol(stock_name: string): Promise<ControllerSuccess<GetStockBySymbol> | BaseError[]> {
    const validationErrors = ParameterValidator.getValidationErrors([ValidatationTypes.STRING, { stock_name }]);
    if (validationErrors !== undefined) {
      return validationErrors;
    }

    try {
      const result = await this.apiService.getStockBySymbol(stock_name);

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

  async CompareStockBySymbols(
    stock_name: string,
    stocks: string[]
  ): Promise<ControllerSuccess<CompareStockBySymbols> | BaseError[]> {
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
}
