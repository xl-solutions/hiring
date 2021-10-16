export interface IQuotes {
  execute(date: IRequest): Promise<any>;
}

export interface IQuotesDTO {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export interface IRequest {
  stock_name: string;
}
