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
const ListProjectGainsUseCase_1 = require("./ListProjectGainsUseCase");
let listProjectGainsUseCase;
let stokcsRepositoryRequestTest;
describe("Find by recent quotes", () => {
    beforeEach(() => {
        stokcsRepositoryRequestTest = new stokcsRepositoryRequestTest_1.StocksRepositoryRequestTest();
        listProjectGainsUseCase = new ListProjectGainsUseCase_1.ListProjectGainsUseCase(stokcsRepositoryRequestTest);
    });
    it("should be able to project gains", () => __awaiter(void 0, void 0, void 0, function* () {
        let stock = "IBM";
        let purchasedAmount = 50;
        let purchasedAt = '2022-04-22';
        const quote = yield listProjectGainsUseCase.execute({
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
    }));
    it("should not be able to project gains a name invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let stock = "IB";
            let purchasedAmount = 50;
            let purchasedAt = '2022-04-22';
            yield listProjectGainsUseCase.execute({
                stock_name: stock,
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt
            });
        })).rejects.toBeInstanceOf(TypeError);
    }));
    it("should not be able to project gains a date invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let stock = "IBM";
            let purchasedAmount = 50;
            let purchasedAt = '2022-04-2';
            yield listProjectGainsUseCase.execute({
                stock_name: stock,
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
