'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index.js');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Stocks Tests', () => {
    describe('/GET stocks/{stockName}/quote', () => {
        it('it should returns the most recent quote for the action', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/quote')
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET stocks/{stock_name}/history?from={ISO_DATE}&to={ISO_DATE}', () => {
        it('it should returns historical share price in an inclusive range', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/history?from=2018-11-01&to=2018-11-30')
                .end((err, res) => {
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should returns a error to required "from" param', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/history?to=2018-11-30')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'from\' is required');
                    done();
                });
        });

        it('it should returns a error to required "to" param', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/history?from=2018-11-01')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'to\' is required');
                    done();
                });
        });

        it('it should returns a error to required "to" and "from" param', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/history')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'from\' is required and \'to\' is required');
                    done();
                });
        });
    });

    describe('/POST stocks/{stockName}/compare', () => {
        it('it should compares an action with one or more actions', (done) => {
            chai.request(app)
                .post('/stocks/MSFT/compare')
                .send({
                    stocks: ['AAA'],
                })
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should returns a error to required "stocks" param', (done) => {
            chai.request(app)
                .post('/stocks/MSFT/compare')
                .send({ })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'stocks\' is required');
                    done();
                });
        });
    });

    describe('/GET stocks/{stockName}/gains?purchasedAmount=3&purchasedAt=2018-11-21', () => {
        it('it should projects gains on purchase on a specific date', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/gains?purchasedAmount=3&purchasedAt=2018-11-21')
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should returns a error to required "purchasedAmount" param', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/gains?purchasedAt=2018-11-21')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'purchasedAmount\' is required');
                    done();
                });
        });

        it('it should returns a error to required "purchasedAt" param', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/gains?purchasedAmount=3')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'purchasedAt\' is required');
                    done();
                });
        });

        it('it should returns a error to required "purchasedAmount" and "purchasedAt" param', (done) => {
            chai.request(app)
                .get('/stocks/MSFT/gains')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('message', '\'purchasedAmount\' is required and \'purchasedAt\' is required');
                    done();
                });
        });
    });
});
