const RequestMock = require('mock-express-request');
const ResponseMock = require('mock-express-response');
require('dotenv').config()

const { getStockByName } = require('../controllers/stocks')

describe('Teste unitário StocksController', () => {
    const stock_name = 'PETR4.SA'
    const invalid_stock_name = 'dsadasd'


    test("O servidor deve ter status 200", async() => {
        const reqMock = new RequestMock({ method: 'get', params: { stock_name } })
        const resMock = new ResponseMock({ request: reqMock })

        await getStockByName(reqMock, resMock)

        expect(resMock.statusCode).toBe(200);
        expect(resMock._getJSON().name).toBe(stock_name);
        expect(typeof resMock._getJSON().lastPrice).toBe('number')
    });

    test("O servidor deve ter status 400", async() => {
        const reqMock = new RequestMock({ method: 'get', params: { invalid_stock_name } });
        const resMock = new ResponseMock({ request: reqMock })

        await getStockByName(reqMock, resMock)

        expect(resMock.statusCode).toBe(400);
        expect(resMock.text).toEqual('Ação não encontrada');
    })
})