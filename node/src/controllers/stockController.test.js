const server = require("../app");
const request = require("supertest");

describe("Check stock Quote", () => {
    it("Should be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/quote");
        
        expect(response.status).toBe(200);
        expect(response.text).not.toBe("[]");
    })
    it("Should not be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/qte")
        expect(response.status).toBe(404);
    })
})
describe("Check stock History", () => {
    it("Should be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/history?from=2022-05-10&to=2022-05-20");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe("[]");
    })
    it("Should not be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/hiory?from=2022-05-10&to=2022-05-20")
        expect(response.status).toBe(404);
    })
})
describe("Check stock Compare", () => {
    it("Should be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL,MSFT/compare");
        expect(response.status).toBe(200);
        expect(response.text).not.toBe("[]");
    })
    it("Should not be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/compar")
        expect(response.status).toBe(404);
    })
})
describe("Check stock Gains", () => {
    it("Should be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/gains?purchasedAmount=10&purchasedAt=2020-05-20");
        
        expect(response.status).toBe(200);
        expect(response.text).not.toBe("[]");
    })
    it("Should not be able to bring the data of the stock", async () => {
        const response = await request(server).get("/stocks/AAPL/gags")
        expect(response.status).toBe(404);
    })
})