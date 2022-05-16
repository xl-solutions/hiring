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
const ListHistoricPricesUseCase_1 = require("./ListHistoricPricesUseCase");
let listHistoricPricesUseCase;
let stokcsRepositoryRequestTest;
describe("Find by historic prices", () => {
    beforeEach(() => {
        stokcsRepositoryRequestTest = new stokcsRepositoryRequestTest_1.StocksRepositoryRequestTest();
        listHistoricPricesUseCase = new ListHistoricPricesUseCase_1.ListHistoricPricesUseCase(stokcsRepositoryRequestTest);
    });
    it("should be able to historic prices", () => __awaiter(void 0, void 0, void 0, function* () {
        let stock = "IBM";
        let from = '2022-05-05';
        let to = '2022-05-13';
        const prices = yield listHistoricPricesUseCase.execute({
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
    }));
    it("should not be able to historic prices a name invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let stock = "IB";
            let from = '2022-05-05';
            let to = '2022-05-13';
            yield listHistoricPricesUseCase.execute({
                stock_name: stock,
                from: from,
                to: to
            });
        })).rejects.toBeInstanceOf(TypeError);
    }));
    it("should not be able to historic prices a date invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let stock = "IBM";
            let from = '2022-05-05';
            let to = '2022-05-1';
            yield listHistoricPricesUseCase.execute({
                stock_name: stock,
                from: from,
                to: to
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
