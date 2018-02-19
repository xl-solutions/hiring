import Vue from 'vue'
import Vuex from 'vuex'
import vueRes from 'vue-resource';
import Home from '@/components/Home'
import { setImmediate } from 'timers';
Vue.use(Vuex);
Vue.use(vueRes);
Vue.http.interceptors.unshift((request, next) => {
  next(request.respondWith({
    name: 'BAR',
    lastPrice: 99.99,
    pricedAt: '2018-02-16T02:00:00.000Z'
  }, {
    status: 200
  }));
});
describe('Home.vue', () => {
  let vm;
  before('Prepara a instância do vue', () => {
    const Constructor = Vue.extend(Home);
    vm = new Constructor({
      store: new Vuex.Store({
        state: {
          stocksNames: [],
          stocksData: []
        },
        mutations: {
          INITIALISE_STOCKS_NAMES(state) {
            state.stocksNames = [];
          },
          INSERT_STOCK_NAME(state, stockName) {
            state.stocksNames.push(stockName);
          },
          REMOVE_STOCK_NAME(state, stockName) {
            const stockNameIndex = state.stocksNames.indexOf(stockName);
            if (stockNameIndex != -1) {
              state.stocksNames.splice(stockNameIndex, 1);
            }
          },
          INSERT_STOCK_DATA(state, stockData) {
            state.stocksData.push(stockData);
          },
          UPDATE_STOCKS_NAME(state, stocksNames) {
            state.stocksNames = stocksNames;
          },
          UPDATE_STOCKS_DATA(state, stocksData) {
            state.stocksData = stocksData;
          }
        }
      })
    }).$mount();
  });
  it('Deve renderizar a primeira tela', () => {
    expect(vm.$el.querySelector('.custom-input h1').textContent).to.equal('Dashboard');
  });
  it('Deve adicionar uma ação e preencher os elementos da UI', (done) => {
    vm.$data.stockName = 'bar';
    setImmediate(function() {
      expect(vm.$el.querySelector('#add-name').value).be.equal(vm.$data.stockName);
      vm.$el.querySelector('#add-btn').click();
      setTimeout(() => {
        expect(vm.$el.querySelector('.collection-item')).exist;
        const span = vm.$el.querySelector('span');
        expect(span).exist;
        expect(span.textContent.indexOf('BAR')).be.greaterThan(-1);
        const p = vm.$el.querySelector('p');
        expect(p.textContent.indexOf('R$99,99')).be.greaterThan(-1);
        expect(p.textContent.indexOf('2018')).be.greaterThan(-1);
        expect(vm.$data.stocksData.length).be.greaterThan(0);
        expect(vm.$data.stocksData[0].name).be.equal('BAR');
        expect(vm.$store.state.stocksNames.length).be.greaterThan(0);
        expect(vm.$store.state.stocksNames[0]).be.equal('BAR');
        expect(vm.$store.state.stocksData.length).be.greaterThan(0);
        expect(vm.$store.state.stocksData[0].name).be.equal('BAR');
        done();
      }, 10);
    });
  });
});
