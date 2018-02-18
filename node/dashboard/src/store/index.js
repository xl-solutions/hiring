import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    stocks: []
  },
  mutations: {
    initialiseState (state) {
      if (localStorage.getItem('stocks')) {
        state.stocks = JSON.parse(localStorage.getItem());
      }
    }
  }
});
