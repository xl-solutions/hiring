import { ApiService } from '../services/ApiService';
import { ApiError, ErrorTypes } from '../utils/types/ApiObjects/ApiError';
import { ApiSuccess } from '../utils/types/ApiObjects/ApiSuccess';
import { ApiResponse } from '../utils/types/ApiResponseFactory';
import { GetStockBySymbol } from '../utils/types/EndpointsTypes';
import { ParameterValidator } from '../utils/validations/ParameterValidator';
import { ValidatationTypes } from '../utils/validations/validationTypes';

export class ApiController {
  constructor(private apiService = new ApiService()) {}

  async getStockBySymbol(stock_name: string): Promise<ApiSuccess | ApiError[]> {
    const validationErrors = ParameterValidator.getValidationErrors([ValidatationTypes.STRING, { stock_name }]);
    if (validationErrors) {
      return validationErrors;
    }

    const result = await this.apiService.getStockBySymbol(stock_name);

    //only errors have code attr error
    if ('code' in result) {
      if (result.code === 'Not Found') {
        return [new ApiError(ErrorTypes.NOT_FOUND, result.description)];
      } else {
        return [new ApiError(ErrorTypes.UNKNOWN, result.description)];
      }
    } else {
      return new ApiSuccess({
        name: result.symbol,
        lastPrice: result.regularMarketPrice,
        pricedAt: new Date(Number(result.regularMarketTime.toString() + '000')).toISOString(),
      });
    }
  }
}
