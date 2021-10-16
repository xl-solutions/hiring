export interface IHistory {
  execute(date: IRequest): Promise<IResponse>;
}

export interface IRequest {
  stock_name: string;
  to: string;
  from: string;
}

interface IPrice {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string;
}

export interface IResponse {
  name: string;
  prices: IPrice[];
}