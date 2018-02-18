const path = require('path');
require('google-finance');
const googleFinancialMock = require('./mocks/google-finance');
require.cache[path.resolve(__dirname, '../node_modules/google-finance/index.js')].exports = googleFinancialMock;
const chai = require('chai');
const RequisitionMock = require('./mocks/requisitionMock');
const ResponseMock = require('./mocks/responseMock');
const userController = require('../controllers/userController');
const moment = require('moment');
describe('Testes no controller de usuário', () => {
	it('Deve retornar json contendo a última cotação da ação', async () => {
		const req = new RequisitionMock();
		const res = new ResponseMock(() => {
			chai.expect(res.respStatus).be.equal(200);
			chai.expect(res.body).exist;
			chai.expect(res.body.name).exist;
			chai.expect(res.body.lastPrice).exist;
			chai.expect(res.body.pricedAt).exist;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		await userController.quote(req, res);
	});
	it('Deve retornar erro 404 quando não encontrar dados da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'UNKNOW.SA'
		});
		await userController.quote(req, res);
		chai.expect(status).be.equal(404);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviado o nome da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		await userController.quote(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar json contendo o histórico de dados da ação', async () => {
		const req = new RequisitionMock();
		const res = new ResponseMock(() => {
			chai.expect(res.respStatus).be.equal(200);
			chai.expect(res.body).exist;
			chai.expect(res.body.name).exist;
			chai.expect(res.body.name).to.be.a('string');
			chai.expect(res.body.prices).exist;
			chai.expect(Array.isArray(res.body.prices)).be.true;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setQueryParams({
			from: '2018-01-01',
			to: '2018-01-10'
		});
		await userController.history(req, res);
	});
	it('Deve retornar erro 404 quando não encontrar dados da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'UNKNOW.SA'
		});
		req.setQueryParams({
			from: '2018-01-01',
			to: '2018-01-10'
		});
		await userController.history(req, res);
		chai.expect(status).be.equal(404);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviado o nome da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setQueryParams({
			from: '2018-01-01',
			to: '2018-01-10'
		});
		await userController.history(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviado o limite de datas', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		await userController.history(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 500 quando não for enviado a data "from" for maior que a data "to"', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setQueryParams({
			from: '2018-01-10',
			to: '2018-01-01'
		});
		await userController.history(req, res);
		chai.expect(status).be.equal(500);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar json contendo o lista com os dados das ações a serem comparadas', async () => {
		const req = new RequisitionMock();
		const res = new ResponseMock(() => {
			chai.expect(res.respStatus).be.equal(200);
			chai.expect(res.body).exist;
			chai.expect(res.body.lastPrices).exist;
			chai.expect(Array.isArray(res.body.lastPrices)).be.true;
			res.body.lastPrices.forEach(element => {
				chai.expect(element).exist;
				chai.expect(element.name).exist;
				if (Object.keys(element).length > 1) {
					chai.expect(element.name).to.be.a('string');
					chai.expect(req.body.stocks.indexOf(element.name)).to.be.greaterThan(-1);
					chai.expect(element.lastPrice).exist;
					chai.expect(element.lastPrice).to.be.a('number');
					chai.expect(element.pricedAt).exist;
					chai.expect(element.pricedAt).to.be.a('string');
					chai.expect(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(element.pricedAt)).be.true;
				}
			});
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setBodyParams({
			stocks: ['PETR4.SA', 'UNKNOW.SA', 'OIBR4.SA']
		});
		await userController.compare(req, res);
	});
	it('Deve retornar erro 400 quando não for enviado o nome da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setBodyParams({
			stocks: ['PETR4.SA', 'UNKNOW.SA', 'OIBR4.SA']
		});
		await userController.compare(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviada a lista para comparações', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		await userController.compare(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviado o limite de datas', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		await userController.history(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar apenas o nome das ações quando não encontrar dados das mesmas', async () => {
		const req = new RequisitionMock();
		const res = new ResponseMock(() => {
			chai.expect(res.respStatus).be.equal(200);
			chai.expect(res.body).exist;
			chai.expect(res.body.lastPrices).exist;
			chai.expect(Array.isArray(res.body.lastPrices)).be.true;
			res.body.lastPrices.forEach(element => {
				chai.expect(element).exist;
				chai.expect(element.name).exist;
				chai.expect(Object.keys(element).length).be.equal(1);
			});
		});
		req.setPathParams({
			stock_name: 'UNKNOW.SA'
		});
		req.setBodyParams({
			stocks: ['UNKNOW.SA', 'UNKNOW.SA', 'UNKNOW.SA']
		});
		await userController.compare(req, res);
	});
	it('Deve retornar json contendo a projeção de ganhos de uma ação', async () => {
		const req = new RequisitionMock();
		const res = new ResponseMock(() => {
			chai.expect(res.respStatus).be.equal(200);
			chai.expect(res.body).exist;
			chai.expect(res.body.name).exist;
			chai.expect(res.body.name).to.be.a('string');
			chai.expect(res.body.name).to.be.equal(req.params.stock_name);
			chai.expect(res.body.purchasedAmount).exist;
			chai.expect(res.body.purchasedAmount).to.be.a('number');
			chai.expect(res.body.purchasedAmount).to.be.equal(parseInt(req.query.purchasedAmount));
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
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setQueryParams({
			purchasedAmount: '100',
			purchasedAt: '2018-01-01'
		});
		await userController.gains(req, res);
	});
	it('Deve retornar erro 500 quando a data de compra for maior que a atual', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setQueryParams({
			purchasedAmount: '100',
			purchasedAt: moment().add(5, 'days').format('YYYY-MM-DD')
		});
		await userController.gains(req, res);
		chai.expect(status).be.equal(500);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviado o nome da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setQueryParams({
			purchasedAmount: '100',
			purchasedAt: moment().add(5, 'days').format('YYYY-MM-DD')
		});
		await userController.gains(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviada a quantidade de ações compradas', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setQueryParams({
			purchasedAt: moment().add(5, 'days').format('YYYY-MM-DD')
		});
		await userController.gains(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar erro 400 quando não for enviado a data de compra das ações', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'OIBR4.SA'
		});
		req.setQueryParams({
			purchasedAmount: '100'
		});
		await userController.gains(req, res);
		chai.expect(status).be.equal(400);
		chai.expect(bodyMessage).exist;
	});
	it('Deve retornar error 404 quando não encontrar dados da ação', async () => {
		const req = new RequisitionMock();
		let status;
		let bodyMessage;
		const res = new ResponseMock(() => {
			status = res.respStatus;
			bodyMessage = res.bodyMessage;
		});
		req.setPathParams({
			stock_name: 'UNKNOW.SA'
		});
		req.setQueryParams({
			purchasedAmount: '100',
			purchasedAt: moment().add(5, 'days').format('YYYY-MM-DD')
		});
		await userController.gains(req, res);
		chai.expect(status).be.equal(404);
		chai.expect(bodyMessage).exist;
	});
});