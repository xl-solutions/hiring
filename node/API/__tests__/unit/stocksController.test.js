const app = require('../../src/app')
const request = require('supertest')

const stock_name = "DOL"
const invalid_stock_name = "asdqweas"


describe('Testes das rotas do arquivo stocksController', () => {

    it('Deve retornar um status 200 com todas a propriedes validas', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/quote`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("lastPrice");
        expect(response.body).toHaveProperty("pricedAt");

    })

    it('Deve retornar um status 404 com uma mensagem de erro valida', async () => {

        const response = await request(app)
            .get(`/stocks/${invalid_stock_name}/quote`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("erro");
        console.log(response.body.erro)
    })


})