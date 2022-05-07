import { Reducer } from 'redux';
import produce from 'immer';
import { ActionsTypes, IPortfolioState } from './types';

const INITIAL_STATE: IPortfolioState = {
  items: [],
  failedStockCheck: [],
};

const portfolio: Reducer<IPortfolioState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.addStockToPortfolioSuccess: {
        const { stock } = action.payload;

        draft.items.push({
          stock,
        });

        break;
      }

      case ActionsTypes.addStockToPortfolioFailure: {
        draft.failedStockCheck.push(action.payload.stockName);
        break;
      }

      case ActionsTypes.removeStockFromPortfolio: {
        const stockInPortfolioIndex = draft.items.findIndex(
          (item) => item.stock.name === action.payload.stockName
        );
        draft.items.splice(stockInPortfolioIndex, 1);

        const removeStockFromFailure = draft.failedStockCheck.filter(
          (item) => item !== action.payload.stockName
        );

        draft.failedStockCheck = removeStockFromFailure;

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default portfolio;
