import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    stocksNames: [],
    stocksData: []
  },
  mutations: {
    INITIALISE_STOCKS_NAMES(state) {
      if (!state.stocksNames.length && localStorage.getItem('stocksNames')) {
        state.stocksNames = JSON.parse(localStorage.getItem('stocksNames'));
      }
    },
    INSERT_STOCK_NAME(state, stockName) {
      state.stocksNames.push(stockName);
      localStorage.setItem('stocksNames', JSON.stringify(state.stocksNames));
    },
    INSERT_STOCK_DATA(state, stockData) {
      state.stocksData.push(stockData);
      sessionStorage.setItem('stocksData', JSON.stringify(state.stocksData));
    },
    UPDATE_STOCKS_DATA(state, stocksData) {
      state.stocksData = stocksData;
      sessionStorage.setItem('stocksData', JSON.stringify(stocksData));
    }
  }
});
