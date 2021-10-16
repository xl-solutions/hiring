export interface IGains {
  execute(date: IRequest): Promise<any>;
}

export interface IRequest {
  stock_name: string;
  purchasedAmount: string;
  purchasedAt: string;
}

export interface IResponse {
  name: string;
  purchasedAmount: string;
  purchasedAt: string;
  priceAtDate: number;
  lastPrice: number;
  capitalGains: number;
}
