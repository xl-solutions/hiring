export enum ActionsTypes {
  addStockToPortfolioRequest = 'ADD_STOCK_TO_PORTFOLIO_REQUEST',
  addStockToPortfolioSuccess = 'ADD_STOCK_TO_PORTFOLIO_SUCCESS',
  addStockToPortfolioFailure = 'ADD_STOCK_TO_PORTFOLIO_FAILURE',
  removeStockFromPortfolio = 'REMOVE_STOCK_FROM_PORTFOLIO',
}

export interface IStock {
  name: string;
  lastPrice?: number;
  company?: string;
  region?: string;
  currency?: string;
}

export interface IPortfolioItem {
  stock: IStock;
}

export interface IPortfolioState {
  items: IPortfolioItem[];
  failedStockCheck: string[];
}
