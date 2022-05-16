import { StocksRepositoryRequestTest } from "../../repositories/request-test/stokcsRepositoryRequestTest";
import { AppError } from "../../../../shared/errors/AppError";

import { ListProjectGainsUseCase } from "./ListProjectGainsUseCase";

let listProjectGainsUseCase: ListProjectGainsUseCase;
let stokcsRepositoryRequestTest: StocksRepositoryRequestTest;

describe("Find by recent quotes", () => {

    beforeEach(() =>{
        stokcsRepositoryRequestTest = new StocksRepositoryRequestTest();
        listProjectGainsUseCase = new ListProjectGainsUseCase(
            stokcsRepositoryRequestTest
        )
    });

    it("should be able to project gains", async () => {
        let stock = "IBM"
        let purchasedAmount = 50;
        let purchasedAt = '2022-04-22';
        const quote = await listProjectGainsUseCase.execute({
            stock_name: stock, 
            purchasedAmount: purchasedAmount,
            purchasedAt: purchasedAt
        });

        expect(quote).toHaveProperty("name");
        expect(quote.name).toBe("IBM");
        expect(quote.purchasedAt).toBe("2022-04-22");
        expect(quote).toHaveProperty('priceAtDate');
        expect(quote).toHaveProperty('lastPrice');
        expect(quote).toHaveProperty('capitalGains');
    });

    it("should not be able to project gains a name invalid", async () => {
        expect(async () => {
            let stock = "IB"
            let purchasedAmount = 50;
            let purchasedAt = '2022-04-22';

            await listProjectGainsUseCase.execute({
                stock_name: stock, 
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt
            })

        }).rejects.toBeInstanceOf(TypeError);   
    });

    it("should not be able to project gains a date invalid", async () => {
        expect(async () => {
            let stock = "IBM"
            let purchasedAmount = 50;
            let purchasedAt = '2022-04-2';

            await listProjectGainsUseCase.execute({
                stock_name: stock, 
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt
            })

        }).rejects.toBeInstanceOf(AppError);   
    });
});