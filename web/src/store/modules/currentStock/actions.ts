import { ActionsTypes, IStock } from './types';

export function updateCurrentStock(stock: IStock) {
  return {
    type: ActionsTypes.updateCurrentStock,
    payload: {
      stock,
    },
  };
}
