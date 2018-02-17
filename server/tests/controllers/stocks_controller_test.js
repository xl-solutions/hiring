let
  app = require('./../../app'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  moment = require('moment')

let expect = chai.expect

chai.use(chaiHttp)

const stock_name = 'PETR4.SA'

/**
 * The response of this request has a return like this json object
 * { "name": "PETR4.SA", "lastPrice": 25.11, "pricedAt": "2017-06-23T14:15:16Z" }
 * */
describe('Test in stocks_controller', () => {
  it('Test route /stocks/:stock_name/quote', (done) => {
    chai.request(app)
      .get('/stocks/' + stock_name + '/quote')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object');
        expect(res.body).have.all.keys('name', 'lastPrice', 'pricedAt');
        expect(res.body.name).to.be.a('string')
        expect(res.body.lastPrice).to.be.a('number')
        expect(res.body.pricedAt).to.be.a('string')

        //check data format
        let validFormat = moment(res.body.pricedAt, moment.ISO_8601, true).isValid()
        expect(validFormat).to.equal(true)

        done();
      });
  });
});