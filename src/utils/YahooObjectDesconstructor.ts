import {
  YahooApiErrorObject,
  YahooApiErrorResponse,
  YahooApiSuccessResponse,
  YahooApiUsefullInfo,
} from './types/YahooApiTypes';

export function desconstructErrorObject(error: YahooApiErrorResponse): YahooApiErrorObject {
  return error.response.data.spark?.error;
}

export function desconstructSuccessObject(result: YahooApiSuccessResponse): YahooApiUsefullInfo {
  return result.spark.result[0].response[0].meta;
}
