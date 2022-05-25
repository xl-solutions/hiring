const stockService = require('./stockService');

describe ('Quote data query', () => {
    it('Should be able to fetch the correct properties', async () => {
        const response = await stockService.quote("AAPL");
        expect(response).toHaveProperty("lastPrice");
        expect(response).toHaveProperty("pricedAt");
        expect(response).toHaveProperty("name");
    })
    it('Should be able to give the correct error if it does not have stock_name', async () => {
        await expect(stockService.quote("")).rejects.toEqual(
            new Error("The stock_name field is missing")
        )
    })
});  
describe ('History data query', () => {
    it('Should be able to fetch the correct properties', async () => {
        const response = await stockService.history("AAPL", "2021-05-10", "2021-05-10");
        expect(response).toHaveProperty("name");
        expect(response).toHaveProperty("pricing");
    })
    it('Should be able to give the correct error if it does not have stock_name', async () => {
        await expect(stockService.history("")).rejects.toEqual(
            new Error("The stock_name field is missing")
        )
    })
});  
describe ('Compare data query', () => {
    it('Should be able to fetch the correct properties', async () => {
        const response = await stockService.compare("AAPL, MSFT");
    })
    it('Should be able to give the correct error if it does not have stock_name', async () => {
        await expect(stockService.compare("")).rejects.toEqual(
            new Error("The stock_name field is missing")
        )
    })
});  
describe ('Gains data query', () => {
    it('Should be able to fetch the correct properties', async () => {
        const response = await stockService.gains("AAPL", "10", "2020-05-20");
        expect(response).toHaveProperty("name");
        expect(response).toHaveProperty("purchasedAmount");
        expect(response).toHaveProperty("purchasedAt");
        expect(response).toHaveProperty("priceAtDate");
        expect(response).toHaveProperty("lastPrice");
        expect(response).toHaveProperty("capitalGains");
    })
    it('Should be able to give the correct error if it does not have stock_name', async () => {
        await expect(stockService.gains("")).rejects.toEqual(
            new Error("The stock_name field is missing")
        )
    })
});  