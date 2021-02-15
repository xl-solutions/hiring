const chai = require('chai');
const http = require('chai-http'); //Extensao da lib chai p/ simular requisicoes http;
const subSet = require('chai-subset'); //Extensao para verificar objetos
const app = require('../routes'); //Arquivo a ser testado

chai.use(http);
chai.use(subSet);



const stockSchema = {
    stock_name: stock_name => stock_name,
    lastprice: lastprice => lastprice,
    pricedAT: priceAt => priceAt 
};

// 2- Testes de Integracao utilizando chai-hhtp para enviar e receber requisicoes

describe('Teste de integracao', (done) => {
const stock_Name = "IBM"
    it('STOCK - GET', () => {
        chai.request(app)
            .get(`/stocks/${stock_Name}/quote`)
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.a('object');
                chai.expect(res.body).to.be.containSubset(stockSchema);
                done();
            })
    })
});


describe('Teste de integracao 2 ', (done) => {
    const stock_Name = "IBM"
        it('STOCK - GET', () => {
            chai.request(app)
                .get(`/stocks/${stock_Name}/history?from='2020-02-10'&to='2021-02-10'`)
                .end((err, res) => {
                    chai.expect(err).to.be.null;
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    done();
                })
        })
    });