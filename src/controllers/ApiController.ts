import { ApiService } from '../services/ApiService';
import { BaseError } from '../utils/errors/BaseError';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { UnknownError } from '../utils/errors/UnknownError';
// import { ControllerError, ErrorTypes } from '../utils/types/ControllerResponses/ControllerError';
import { ControllerSuccess } from '../utils/types/ControllerResponses/ControllerSuccess';
import { YahooApiErrorObject } from '../utils/types/YahooApi/YahooApiTypes';
import { ParameterValidator } from '../utils/validations/ParameterValidator';
import { ValidatationTypes } from '../utils/validations/Validators';

export class ApiController {
  static instance: ApiController;

  private constructor(private apiService = new ApiService()) {}

  static getInstance(apiService?: ApiService): ApiController {
    if (!ApiController.instance) {
      ApiController.instance = new ApiController(apiService);
    }
    return ApiController.instance;
  }

  async getStockBySymbol(stock_name: string): Promise<ControllerSuccess | BaseError[]> {
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
      //typing
      const error: YahooApiErrorObject = err;
      if (error.code === 'Not Found') {
        return [new NotFoundError({ stock_name })];
      } else {
        return [new UnknownError()];
      }
    }
  }

  async compareStockBySymbol(stock_name: string, stocks: string[]) {
    const stocksArray = [stock_name, ...stocks];
    const results = await Promise.all(
      stocksArray.map(async (stocks) => {
        return this.getStockBySymbol(stocks);
      })
    );

    const errorArray: BaseError[] = [];
    results.forEach((element) => {
      if ('length' in element) {
        errorArray.push(...element);
      }
    });

    console.log(errorArray);
    // return results;
  }
}
