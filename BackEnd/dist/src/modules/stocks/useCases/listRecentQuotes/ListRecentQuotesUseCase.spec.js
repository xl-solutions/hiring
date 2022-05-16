"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stokcsRepositoryRequestTest_1 = require("../../repositories/request-test/stokcsRepositoryRequestTest");
const AppError_1 = require("../../../../shared/errors/AppError");
const ListRecentQuotesUseCase_1 = require("./ListRecentQuotesUseCase");
let listRecentQuotesUseCase;
let stokcsRepositoryRequestTest;
describe("Find by recent quotes", () => {
    beforeEach(() => {
        stokcsRepositoryRequestTest = new stokcsRepositoryRequestTest_1.StocksRepositoryRequestTest();
        listRecentQuotesUseCase = new ListRecentQuotesUseCase_1.ListRecentQuotesUseCase(stokcsRepositoryRequestTest);
    });
    it("should be able to list a recent quotes", () => __awaiter(void 0, void 0, void 0, function* () {
        let stock = "IBM";
        const quote = yield listRecentQuotesUseCase.execute({ stock_name: stock });
        expect(quote).toHaveProperty("name");
        expect(quote.name).toBe("IBM");
        expect(quote).toHaveProperty("lastPrice");
    }));
    it("should not be able to list a recent quotes a name invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let stock = "IB";
            yield listRecentQuotesUseCase.execute({ stock_name: stock });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
