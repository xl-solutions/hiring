const chai = require('chai');
const path = require('path');
require('google-finance');
const googleFinancialMock = require('./mocks/google-finance');
require.cache[path.resolve(__dirname, '../node_modules/google-finance/index.js')].exports = googleFinancialMock;
const moment = require('moment');
const stockService = require('../service/stock');
describe('Testes no módulo financeiro das regras de negócio', () => {
	it('Deve recuperar dados de uma ação', async () => {
		const stock = 'PETR4.SA';
		const test = await stockService.getHistorical(stock, moment().subtract(5), moment());
		chai.expect(test).exist;
		chai.expect(Array.isArray(test)).be.true;
		chai.expect(test.length).be.greaterThan(0);
		test.forEach(element => {
			chai.expect(element.symbol).exist
			chai.expect(element.symbol).to.be.a('string');
			chai.expect(element.volume).exist;
			chai.expect(element.volume).to.be.a('number');
			chai.expect(element.low).exist;
			chai.expect(element.low).to.be.a('number');
			chai.expect(element.close).exist;
			chai.expect(element.close).to.be.a('number');
			chai.expect(element.high).exist;
			chai.expect(element.high).to.be.a('number');
			chai.expect(element.open).exist;
			chai.expect(element.open).to.be.a('number');
			chai.expect(element.date).exist;
			chai.expect(element.date.toISOString).exist;
			chai.expect(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(element.date.toISOString())).be.true;
		});
	});
	it('Deve obter uma coleção vazia ao solicitar dados de uma ação que não exista', async () => {
		const stock = 'UNKNOW.SA';
		const test = await stockService.getHistorical(stock, moment().subtract(5), moment());
		chai.expect(test).exist;
		chai.expect(Array.isArray(test)).be.true;
		chai.expect(test.length).be.equal(0);
	});
});