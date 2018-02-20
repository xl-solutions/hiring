import Vue from 'vue';
import Vuex from 'vuex';
import vueRes from 'vue-resource';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import HistoryComponent from '@/components/History';
import Projection from '@/components/Projection';
import { setImmediate } from 'timers';
import moment from 'moment';
Vue.use(Vuex);
Vue.use(vueRes);
Vue.use(VueRouter);
Vue.http.interceptors.unshift((request, next) => {
    console.log(request.url);
    if (request.method == 'GET' && request.url.indexOf('BAR/quote') > -1) {
        next(request.respondWith({
            name: 'BAR',
            lastPrice: 99.99,
            pricedAt: '2018-02-16T02:00:00.000Z'
        }, {
            status: 200
        }));
    } else if (request.method == 'GET' && request.url.indexOf('BAR/history') > -1) {
        next(request.respondWith({
            name: "BAR",
            prices: [{
                opening: 14.67,
                low: 14.57,
                high: 14.89,
                closing: 14.85,
                pricedAt: "2017-04-04T03:00:00.000Z"
            }, {
                opening: 15.05,
                low: 14.5,
                high: 15.16,
                closing: 14.57,
                pricedAt: "2017-04-05T03:00:00.000Z"
            }]
        }, {
            status: 200
        }));
    } else if (request.method == 'GET' && request.url.indexOf('BAR/gains') > -1) {
        next(request.respondWith({
            name: "BAR",
            purchasedAmount: 100,
            purchasedAt: "2018-01-02",
            priceAtDate: 16.55,
            lastPrice: 19.42,
            capitalGains: 287.0000000000001
        }, {
            status: 200
        }));
    } else {
        next(request.respondWith({}, {
            status: 404
        }));
    }
});
describe('Teste do Home', () => {
    let vm;
    before('Prepara a instância do vue', () => {
        const clone = Vue.extend();
        const Constructor = clone.extend(Home);
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
        expect(vm.$el.querySelector('.custom-input h1').textContent.indexOf('Dashboard')).be.greaterThan(-1);
    });
    it('Deve adicionar uma ação e preencher os elementos da UI', (done) => {
        vm.$data.stockName = 'bar';
        setImmediate(function() {
            expect(vm.$el.querySelector('#add-name').value).be.equal(vm.$data.stockName);
            vm.$el.querySelector('#add-btn').click();
            setTimeout(() => {
                const item = vm.$el.querySelector('.collection-item');
                expect(item).exist;
                expect(item.textContent.indexOf('BAR')).be.greaterThan(-1);
                expect(item.textContent.indexOf('R$99,99')).be.greaterThan(-1);
                expect(item.textContent.indexOf('2018')).be.greaterThan(-1);
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
    it('Deve impedir que uma ação inválida seja adicionada', (done) => {
        vm.$store.state.stocksNames = [];
        vm.$store.state.stocksData = [];
        vm.$data.stocksData = [];
        vm.$data.stockName = 'foo';
        setImmediate(function() {
            expect(vm.$el.querySelector('#add-name').value).be.equal(vm.$data.stockName);
            vm.$el.querySelector('#add-btn').click();
            setTimeout(() => {
                const item = vm.$el.querySelector('.collection-item');
                expect(item).not.exist;
                const title = vm.$el.querySelector('title');
                expect(title).not.exist;
                expect(vm.$data.stocksData.length).be.equal(0);
                expect(vm.$store.state.stocksNames.length).be.equal(0);
                expect(vm.$store.state.stocksData.length).be.equal(0);
                done();
            }, 10);
        });
    });
});

describe('Teste do History', () => {
    let vm;
    before('Prepara a instância do vue', () => {
        const clone = Vue.extend();
        const Constructor = clone.extend(HistoryComponent);
        vm = new Constructor({
            propsData: {
                stock: 'BAR'
            },
            router: new VueRouter({
                path: '/',
                component: HistoryComponent
            })
        }).$mount();
    });
    it('Deve renderizar a primeira tela', (done) => {
        expect(vm.$el.querySelector('.input-field span').textContent.indexOf('Data Inicial')).be.greaterThan(-1);
        done();
    });
    it('Deve corrigir a data quando a data de inicial for mais recente que a data final', () => {
        vm.$data.startDate = '2018-01-10';
        vm.$data.endDate = '2018-01-09';
        vm.checkDate();
        expect(vm.$data.startDate).be.equal(vm.$data.endDate);
    });
    it('Deve renderizar a view com o histórico de preço das ações', (done) => {
        vm.search();
        setImmediate(() => {
            expect(vm.$data.stocksData.length).be.greaterThan(0);
            const len = vm.$data.stocksData.length;
            const itens = vm.$el.querySelectorAll('.collection-item');
            expect(itens).exist;
            expect(itens.length).be.equal(len);
            for (let i = 0; i < len; i++) {
                expect(itens[i].textContent.indexOf('Dia')).be.greaterThan(-1);
                expect(itens[i].textContent.indexOf('Abertura')).be.greaterThan(-1);
                expect(itens[i].textContent.indexOf('Cotação baixa')).be.greaterThan(-1);
                expect(itens[i].textContent.indexOf('Cotação alta')).be.greaterThan(-1);
                expect(itens[i].textContent.indexOf('Cotação final')).be.greaterThan(-1);
            }
            done();
        });
    });
    it('Deve limpar a view quando o histórico for zero', (done) => {
        vm.$data.stocksData = [];
        setImmediate(() => {
            const itens = vm.$el.querySelectorAll('.collection-item');
            expect(itens.length).be.equal(0);
            done();
        });
    });
});

describe('Teste do Projection', () => {
    let vm;
    before('Prepara a instância do vue', () => {
        const clone = Vue.extend();
        const Constructor = clone.extend(Projection);
        vm = new Constructor({
            propsData: {
                stock: 'BAR'
            },
            router: new VueRouter({
                path: '/',
                component: HistoryComponent
            })
        }).$mount();
    });
    it('Deve renderizar a primeira tela', () => {
        expect(vm.$el.querySelector('.input-field span').textContent.indexOf('Data da compra')).be.greaterThan(-1);
    });
    it('Deve renderizar a view com a projeção de ganhos', (done) => {
        vm.project();
        setImmediate(() => {
            expect(vm.$data.stockData).to.not.be.null;
            const item = vm.$el.querySelector('.card');
            expect(item.textContent.indexOf('BAR')).be.greaterThan(-1);
            expect(item.textContent.indexOf('Data da compra')).be.greaterThan(-1);
            expect(item.textContent.indexOf('Quantidade')).be.greaterThan(-1);
            expect(item.textContent.indexOf('Cotação na compra')).be.greaterThan(-1);
            expect(item.textContent.indexOf('Cotação atual')).be.greaterThan(-1);
            expect(item.textContent.indexOf('Ganhos')).be.greaterThan(-1);
            done();
        });
    });
});
