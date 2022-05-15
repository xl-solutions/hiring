import { StocksRepositoryRequestTest } from "../../repositories/request-test/stokcsRepositoryRequestTest";
import { AppError } from "../../../../shared/errors/AppError";

import { ListRecentQuotesUseCase } from "./ListRecentQuotesUseCase";

let listRecentQuotesUseCase: ListRecentQuotesUseCase;
let stokcsRepositoryRequestTest: StocksRepositoryRequestTest;

describe("Find by recent quotes", () => {

    beforeEach(() =>{
        stokcsRepositoryRequestTest = new StocksRepositoryRequestTest();
        listRecentQuotesUseCase = new ListRecentQuotesUseCase(
            stokcsRepositoryRequestTest
        )
    })

    it("should be able to list a recent quotes", async () => {
        let stock = "IBM"
        const quote = await listRecentQuotesUseCase.execute({stock_name: stock})

        expect(quote).toHaveProperty("name");
        expect(quote.name).toBe("IBM");
        expect(quote).toHaveProperty("lastPrice")
    })

    it("should not be able to list a recent quotes a name invalid", async () => {
        expect(async () => {
            let stock = "IB"
            await listRecentQuotesUseCase.execute({stock_name: stock})

        }).rejects.toBeInstanceOf(AppError);   
    })
});