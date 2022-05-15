import { StocksRepositoryRequestTest } from "../../repositories/request-test/stokcsRepositoryRequestTest";
import { AppError } from "../../../../shared/errors/AppError";

import { ListHistoricPricesUseCase } from "./ListHistoricPricesUseCase";

let listHistoricPricesUseCase: ListHistoricPricesUseCase;
let stokcsRepositoryRequestTest: StocksRepositoryRequestTest;

describe("Find by historic prices", () => {

    beforeEach(() =>{
        stokcsRepositoryRequestTest = new StocksRepositoryRequestTest();
        listHistoricPricesUseCase = new ListHistoricPricesUseCase(
            stokcsRepositoryRequestTest
        )
    })

    it("should be able to historic prices", async () => {
        let stock = "IBM"
        let from = '2022-05-05';
        let to = '2022-05-13';
        const prices = await listHistoricPricesUseCase.execute({
            stock_name: stock, 
            from: from,
            to: to
        });

        expect(prices).toHaveProperty("name");
        expect(prices.name).toBe("IBM");
        expect(prices).toHaveProperty("prices");
        expect(prices.prices[0]).toHaveProperty('opening');
        expect(prices.prices[0]).toHaveProperty('low');
        expect(prices.prices[0]).toHaveProperty('high');
        expect(prices.prices[0]).toHaveProperty('closing');
        expect(prices.prices.length).toBeGreaterThanOrEqual(1);
    });

    it("should not be able to historic prices a name invalid", async () => {
        expect(async () => {
            let stock = "IB"
            let from = '2022-05-05';
            let to = '2022-05-13';

            await listHistoricPricesUseCase.execute({
                stock_name: stock, 
                from: from,
                to: to
            })

        }).rejects.toBeInstanceOf(TypeError);   
    });

    it("should not be able to historic prices a date invalid", async () => {
        expect(async () => {
            let stock = "IBM"
            let from = '2022-05-05';
            let to = '2022-05-1';

            await listHistoricPricesUseCase.execute({
                stock_name: stock, 
                from: from,
                to: to
            })

        }).rejects.toBeInstanceOf(AppError);   
    });
});