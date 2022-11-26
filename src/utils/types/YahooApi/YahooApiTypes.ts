//thats dumb...
export interface YahooApiSuccessResponse {
  spark: {
    result: YahooApiReponseResult[];
    error: null;
  };
}

export interface YahooApiErrorObject {
  code: string;
  description: string;
}

export interface YahooApiErrorResponse {
  response: {
    data: {
      spark: {
        result: null;
        error: YahooApiErrorObject;
      };
    };
  };
}

export interface YahooApiReponseResult {
  symbol: string;
  response: YahooApiResponse[];
}

export interface YahooApiUsefullInfo {
  regularMarketTime: number;
  regularMarketPrice: number;
  symbol: string;
}

export interface YahooApiResponse {
  meta: YahooApiUsefullInfo;
}
