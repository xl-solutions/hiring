const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Stocks Markets', () => {
    describe('/GET stocks/:stock_name/quote', () => {
        it('it should GET recent quote for given stock name', (done) => {
            chai.request(server)
                .get('/stocks/VALE5/quote')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET stocks/:stock_name/history?from=&to=', () => {
        it('it should GET quote for given stock name and date interval', (done) => {
            chai.request(server)
                .get('/stocks/VALE5/history?from=2017-08-30&to=2017-09-01')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/POST stocks/:stock_name/compare', () => {
        it('it should POST returns compare information over actions given', (done) => {
            chai.request(server)
                .post('/stocks/VALE5/compare')
                .send({
                    stocks: ['PETR4'],
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET stocks/:stock_name/gains?purchasedAmount=&purchasedAt=', () => {
        it('it should GET project gains for given stock name', (done) => {
            chai.request(server)
                .get('/stocks/VALE5/gains?purchasedAmount=100&purchasedAt=2017-08-30')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});