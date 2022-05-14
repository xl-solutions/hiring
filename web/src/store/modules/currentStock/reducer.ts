import { Reducer } from 'redux';
import produce from 'immer';
import { ActionsTypes, ICurrentStockState } from './types';

const INITIAL_STATE: ICurrentStockState = {
  stock: { name: 'AAPL', company: 'Apple Inc' },
};

const currentStock: Reducer<ICurrentStockState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.updateCurrentStock: {
        const { stock } = action.payload;

        draft.stock = {
          name: stock.name,
          company: stock.company,
          lastPrice: stock.lastPrice,
          currency: stock.currency,
          region: stock.region,
        };

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default currentStock;
