const app = require('../../src/app')
const request = require('supertest')


const stock_name = "DOL"
const invalid_stock_name = "asdqweas"

const from = "2020-07-10"
const to = "2020-07-21"
const invalid_from = "asdasd2020-07-10"
const invalid_to = "asdas2020-07-21"

const purchasedAmount = 10
const invalid_purchasedAmount = -10

var count = 0;

jest.setTimeout(60000);




//Adicionei essa espera de 1 minuto a cada 5 requisiçoes pois a api da alpha só permite 5 requisiçoes por minuto
beforeEach(async () => {
    count++
    if (count == 5) {
       
        count = 0;
        await (new Promise(resolve => setTimeout(resolve, 60000)))
    }
});


describe('Testes da rota /quote do arquivo stocksController', () => {



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
    })


})

describe('Testes da rota /history do arquivo stocksController', () => {



    it('Deve retornar status 200 e ter as propriedades validas do historico', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/history?from=${from}&to=${to}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("prices");
    })
    it('Deve retornar status 400 com uma mensagem de erro valida (argumentos invalidos - from)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/history?from=${from}&to=`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })
    it('Deve retornar status 400 com uma mensagem de erro valida (argumentos invalidos - to)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/history?from=&to=${to}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })
    it('Deve retornar status 400 com uma mensagem de erro valida (formato de data invalido - from)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/history?from=${invalid_from}&to=${to}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })
    it('Deve retornar status 400 com uma mensagem de erro valida (formato de data invalido - to)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/history?from=${invalid_from}&to=${to}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })
    it('Deve retornar status 400 com uma mensagem de erro valida (data inicial maior que final)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/history?from=${to}&to=${from}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })
    it('Deve retornar status 404 com uma mensagem de erro valida', async () => {

        const response = await request(app)
            .get(`/stocks/${invalid_stock_name}/history?from=${from}&to=${to}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("erro");
    })

})

describe('Testes da rota /compare do arquivo stocksController', () => {


    it('Deve retornar status 200', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/compare`)
            .send(
                {
                    stocks: ["DOL"]
                });

        expect(response.status).toBe(200)
    })
    it('Deve retornar um status 404 com uma mensagem de erro valida', async () => {

        const response = await request(app)
            .get(`/stocks/${invalid_stock_name}/compare`)
            .send({
                stocks: ["DOL"]
            });


        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("erro");
    })

})

describe('Testes da rota /gains do arquivo stocksController', () => {



    it('Deve retornar um status 200 com todas a propriedes validas', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${from}`)

        console.log(response.body)
        expect(response.status).toBe(200)

    })

    it('Deve retornar um status 400 com uma mensagem de erro valida (Numero de açoes invalido)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/gains?purchasedAmount=&purchasedAt=${from}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })

    it('Deve retornar um status 400 com uma mensagem de erro valida (Numero de açoes negativo)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/gains?purchasedAmount=${invalid_purchasedAmount}&purchasedAt=${from}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })

    it('Deve retornar um status 400 com uma mensagem de erro valida (Data com formato invalido)', async () => {

        const response = await request(app)
            .get(`/stocks/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${invalid_from}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("erro");
    })

    it('Deve retornar um status 404 com uma mensagem de erro valida (stock_name invalido)', async () => {

        const response = await request(app)
            .get(`/stocks/${invalid_stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${from}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("erro");
    })




})
