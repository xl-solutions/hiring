import { ISO8601 } from '@shared/utils/validate';

export interface IAlphaVantageDTO {
  getPrices(stock_name: IRequest): Promise<IResponse>;
  getLatest(stock_name: IRequest): Promise<IResponseLatest>;
}

export interface IRequest {
  stock_name: string;
}

export interface IResponse {
  [key: string]: {
    ['1. open']: string;
    ['2. high']: string;
    ['3. low']: string;
    ['4. close']: string;
    ['5. adjusted close']: string;
    ['6. volume']: string;
    ['7. dividend amount']: string;
    ['8. split coefficient']: string;
  };
}

export interface IResponseLatest {
  ['01. symbol']: string;
  ['02. open']: string;
  ['03. high']: string;
  ['04. low']: string;
  ['05. price']: string;
  ['06. volume']: string;
  ['07. latest trading day']: string;
  ['08. previous close']: string;
  ['09. change']: string;
  ['10. change percent']: string;
}
