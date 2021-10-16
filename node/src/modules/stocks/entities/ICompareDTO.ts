export interface ICompare {
  execute(stock_name: IRequest): Promise<any>;
}

export interface IRequest {
  stock_name: string;
  stocks: string[];
}