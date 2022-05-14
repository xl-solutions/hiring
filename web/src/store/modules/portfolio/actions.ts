import { ActionsTypes, IStock } from './types';

export function addStockToPortfolioRequest(stock: IStock) {
  return {
    type: ActionsTypes.addStockToPortfolioRequest,
    payload: {
      stock,
    },
  };
}

export function addStockToPortfolioSuccess(stock: IStock) {
  return {
    type: ActionsTypes.addStockToPortfolioSuccess,
    payload: {
      stock,
    },
  };
}

export function addStockToPortfolioFailure(stockName: string) {
  return {
    type: ActionsTypes.addStockToPortfolioFailure,
    payload: {
      stockName,
    },
  };
}

export function removeStockFromPortfolio(stockName: string) {
  return {
    type: ActionsTypes.removeStockFromPortfolio,
    payload: {
      stockName,
    },
  };
}
