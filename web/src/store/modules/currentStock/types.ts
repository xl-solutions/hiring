export enum ActionsTypes {
  updateCurrentStock = 'UPDATE_CURRENT_STOCK',
}

export interface IStock {
  name: string;
  lastPrice?: number;
  company?: string;
  region?: string;
  currency?: string;
}

export interface ICurrentStockState {
  stock: IStock;
}
