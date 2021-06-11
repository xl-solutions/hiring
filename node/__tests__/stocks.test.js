const app = require('../routes/index');
const supertest = require('supertest');
const request = supertest(app)


describe('/GET /stocks/:stock_name/quote', () => {
    it('it should GET the most recent quote for the given stock', async () => {
        const response = await request.get('/stocks/IBM/quote');
        expect(response.status).toBe(200)
    });
});

describe('/GET /stocks/:stock_name/history?from=<string>&to=<string>', () => {
    it('It should GET an object with the quote for the stock given some date interval', async () => {
        const response = await request.get('/stocks/IBM/history?from=2017-08-30&to=2017-09-01');
        expect(response.statusCode).toBe(200);
    })
    it('It should GET and error, the date time format is wrong', async () => {
        const response = await request.get('/stocks/IBM/history?from=2017-44-30&to=2017-09-01');
        expect(JSON.stringify(response.body)).toContain('ISO');
    });
});



describe('/POST /stocks/:stock_name/compare', () => {
    jest.setTimeout(10000);
    it('It should POST a list of quotes for the given stocks', async () => {
        const response = await request.post('/stocks/IBM/compare')
            .send({
                stocks: ['TTT'],
            });
        expect(response.statusCode).toBe(200);
    });
});

describe('/GET /stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>', () => {
    jest.setTimeout(10000);
    it('It should GET some info about gains given a stock, a quantity and a purchased data', async () => {

        const response = await request.get('/stocks/IBM/gains?purchasedAmount=100&purchasedAt=2016-05-31');
        expect(response.statusCode).toBe(200);
    });
});

