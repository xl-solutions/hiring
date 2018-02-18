const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const path = require('path');
require('google-finance');
const googleFinancialMock = require('./mocks/google-finance');
require.cache[path.resolve(__dirname, '../node_modules/google-finance/index.js')].exports = googleFinancialMock;
const server = require('../config/app')();
describe('Testes no servidor', () => {
	it('Deve retornar json contendo a última cotação da ação', async () => {
		const res = await chai
			.request(server)
			.get('/stocks/PETR4.SA/quote');
		chai.expect(res.body).exist;
		chai.expect(res.body.name).exist;
		chai.expect(res.body.lastPrice).exist;
		chai.expect(res.body.pricedAt).exist;
	});
	it('Deve retornar json contendo histórico de preços da ação', async () => {
		const res = await chai
			.request(server)
			.get('/stocks/PETR4.SA/history?from=2017-04-04&to=2017-04-05');
		chai.expect(res.body).exist;
		chai.expect(res.body.name).exist;
		chai.expect(res.body.name).to.be.a('string');
		chai.expect(res.body.prices).exist;
		chai.expect(Array.isArray(res.body.prices)).be.true;
		res.body.prices.forEach(element => {
			chai.expect(element.opening).exist;
			chai.expect(element.opening).be.a('number');
			chai.expect(element.low).exist;
			chai.expect(element.low).be.a('number');
			chai.expect(element.high).exist;
			chai.expect(element.high).be.a('number');
			chai.expect(element.closing).exist;
			chai.expect(element.closing).be.a('number');
			chai.expect(element.pricedAt).exist;
			chai.expect(element.pricedAt).be.a('string');
		});
	});
	it('Deve retornar json os dados das ações enviadas', async () => {
		const res = await chai
			.request(server)
			.put('/stocks/PETR4.SA/compare')
			.send({
				stocks: ['TIMP3.SA', 'VIVT4.SA']
			});
		chai.expect(res.body).exist;
		chai.expect(res.body.lastPrices).exist;
		chai.expect(Array.isArray(res.body.lastPrices)).be.true;
		res.body.lastPrices.forEach(element => {
			chai.expect(element).exist;
			chai.expect(element.name).exist;
			if (Object.keys(element).length > 1) {
				chai.expect(element.name).to.be.a('string');
				chai.expect(['TIMP3.SA', 'VIVT4.SA', 'PETR4.SA'].indexOf(element.name)).to.be.greaterThan(-1);
				chai.expect(element.lastPrice).exist;
				chai.expect(element.lastPrice).to.be.a('number');
				chai.expect(element.pricedAt).exist;
				chai.expect(element.pricedAt).to.be.a('string');
				chai.expect(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(element.pricedAt)).be.true;
			}
		});
	});
	it('Deve retornar json contendo histórico de preços da ação', async () => {
		const purchasedAmount = 100;
		const purchasedAt = '2018-01-01';
		const res = await chai
			.request(server)
			.get(`/stocks/PETR4.SA/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`);
		chai.expect(res.body).exist;
		chai.expect(res.body.name).exist;
		chai.expect(res.body.name).to.be.a('string');
		chai.expect(res.body.purchasedAmount).exist;
		chai.expect(res.body.purchasedAmount).to.be.a('number');
		chai.expect(res.body.purchasedAmount).to.be.equal(purchasedAmount);
		chai.expect(res.body.purchasedAt).exist;
		chai.expect(res.body.purchasedAt).to.be.a('string');
		chai.expect(/^\d{4}-\d{2}-\d{2}$/.test(res.body.purchasedAt)).be.true;
		chai.expect(res.body.priceAtDate).exist;
		chai.expect(res.body.priceAtDate).to.be.a('number');
		chai.expect(res.body.lastPrice).exist;
		chai.expect(res.body.lastPrice).to.be.a('number');
		chai.expect(res.body.capitalGains).exist;
		chai.expect(res.body.capitalGains).be.equal(parseInt(res.body.purchasedAmount) * (res.body.lastPrice - res.body.priceAtDate));
	});
});