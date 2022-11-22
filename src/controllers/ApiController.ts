import { ApiService } from '../services/ApiService';
import { ControllerError, ErrorTypes } from '../utils/types/ControllerResponses/ControllerError';
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

  async getStockBySymbol(stock_name: string): Promise<ControllerSuccess | ControllerError[]> {
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
        return [new ControllerError(ErrorTypes.NOT_FOUND, error.description)];
      } else {
        return [new ControllerError(ErrorTypes.UNKNOWN, error.description)];
      }
    }
  }

  async getStockBySymbol(stock_name: string): Promise<ControllerSuccess | ControllerError[]> {
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
        return [new ControllerError(ErrorTypes.NOT_FOUND, error.description)];
      } else {
        return [new ControllerError(ErrorTypes.UNKNOWN, error.description)];
      }
    }
  }
}
