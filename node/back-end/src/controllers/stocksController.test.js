const request = require('supertest')
const app = require('../app')

jest.setTimeout(60000);

let stock_name = 'PETR4.SA'
let secondValidName = 'IBM'
let stock_name_invalid = 'jajsjasj'
let missing_stock_name = ''
let validFormatDateTo = "2021-08-20"
let validFormatDateFrom = "2020-08-20"
let invalidFormatDateTo = '20-08-2021'
let invalidFormatDateFrom = '20-08-2020'
let purchasedAmount = '100'
let invalidAmount = '-1'



describe('Test unit StocksController', () => {
    
    test('should be return 200', async () => {
        const response = await request(app).get(`/${stock_name}/quote`)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(stock_name)
    })

    test('should be return 404', async () => {
        const response = await request(app).get(`/${stock_name_invalid}/quote`)

        expect(response.status).toBe(404)
        expect(response.text).toEqual('Stock not found')
    })

    // test("should be return 400 if no params is provided", async () => {
    //     const response = await request(app).get(`/${missing_stock_name}/quote`)
    //     expect(response.status).toBe(400)
    //     expect(response.text).toEqual('Invalid stock name or stock name is required')
    // })
    
})
//route history
describe('TEST unit route /history', () => {
    test('should be return 200', async () => {
        const response = await request(app).get(`/${stock_name}/history?from=${validFormatDateFrom}&to=${validFormatDateTo}`)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe(stock_name)
        expect(response.body).toHaveProperty("prices")
    })

    test('should be return 400 if missing from', async () => {
        const response = await request(app).get(`/${stock_name}/history?to=${validFormatDateTo}`)

        expect(response.status).toBe(400)
        expect(response.text).toEqual('Invalid date or date is required')
    })

    test('should be return 400 if missing to', async() => {
        const response = await request(app).get(`/${stock_name}/history?from=${validFormatDateFrom}`)

        expect(response.status).toBe(400)
        expect(response.text).toEqual('Invalid date or date is required')
    })

    test('should be return 400 if from > to', async() => {
        // in this case i don't want mock the date , because is not necessary'
        let from = "2021-08-19"
        let to = "2021-08-18"
        const response = await request(app).get(`/${stock_name}/history?from=${from}&to=${to}`)

        expect(response.status).toBe(400)
        expect(response.text).toEqual('Invalid date! Please send init date less than final date')
    })

    test('should be return 400 if invalid date format', async() => {
        const response = await request(app).get(`/${stock_name}/history?from=${invalidFormatDateFrom}&to=${invalidFormatDateTo}`)

        expect(response.status).toBe(400)
        expect(response.text).toEqual('Invalid date format! Please send a correct date format: YYYY-MM-DD')
    })

    test('should be return 400 if no stock found', async () => {
        const response = await request(app).get(`/${stock_name_invalid}/history?from=${validFormatDateFrom}&to=${validFormatDateTo}`)
        expect(response.status).toBe(400)
    })
    
})

describe('TEST unit route /compare', () => {
    test('should be return status 200', async() => {
        const response = await request(app).get(`/${stock_name}/compare`).send({
            stocks: [secondValidName]
        })
        expect(response.status).toBe(200)
    })

    test('should be return status 400 if no stocks provided', async() => {
        const response = await request(app).get(`/${stock_name}/compare`).send({
            stocks: []
        })

        expect(response.status).toBe(400)
    })

    test('should be return 400 if no invalid stock_name is provided', async() => {
        const response = await request(app).get(`/${stock_name_invalid}/compare`).send({
            stocks: [secondValidName]
        })

        expect(response.status).toBe(404)
    })
    
})

describe('Test unit route /gains', () => {
    test('should be return status 200', async() => {
        const response = await request(app).get(`/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${validFormatDateFrom}`)
        expect(response.status).toBe(200)
    })

    test('should be return 400 if number of Amount is negative', async() => {
        const response = await request(app).get(`/${stock_name}/gains?purchasedAmount=${invalidAmount}&purchasedAt=${validFormatDateFrom}`)
        expect(response.status).toBe(400)
    })

    test('should return 400 if invalid format date is provided', async () => {
        const response = await request(app).get(`/${stock_name}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${invalidFormatDateFrom}`)
        expect(response.status).toBe(400)
    })

    test('should be returned 404 if invalid_name is provided', async() => {
        const response = await request(app).get(`/${stock_name_invalid}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${validFormatDateFrom}`)
        expect(response.status).toBe(404)
    })
    

    
})
