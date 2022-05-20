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
const ListCompareStocksUseCase_1 = require("./ListCompareStocksUseCase");
let listCompareStocksUseCase;
let stokcsRepositoryRequestTest;
describe("Compare stocks", () => {
    beforeEach(() => {
        stokcsRepositoryRequestTest = new stokcsRepositoryRequestTest_1.StocksRepositoryRequestTest();
        listCompareStocksUseCase = new ListCompareStocksUseCase_1.ListCompareStocksUseCase(stokcsRepositoryRequestTest);
    });
    it("should be able to compare stocks", () => __awaiter(void 0, void 0, void 0, function* () {
        let stock = "OIBR4.SA";
        let stocks = ["TIMP3.SA", "VIVT4.SA"];
        const compare = yield listCompareStocksUseCase.execute({
            stock_name: stock,
            stocks
        });
        expect(compare).toHaveProperty("lastPrice");
        expect(compare.lastPrice[0]).toHaveProperty('name');
        expect(compare.lastPrice[0]).toHaveProperty('lastPrice');
        expect(compare.lastPrice[0]).toHaveProperty('pricedAt');
        expect(compare.lastPrice.length).toBeGreaterThanOrEqual(1);
    }));
    it("should not be able to compare stocks a name invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let stock = "OIBR4.S";
            let stocks = ["TIMP3.SA", "VIVT4.SA"];
            yield listCompareStocksUseCase.execute({
                stock_name: stock,
                stocks
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
    it("should not be able to compare stocks a max 5 calls", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            let name = "OIBR4.SA";
            let stocks = ["TIMP3.SA", "VIVT4.SA"];
            yield listCompareStocksUseCase.execute({
                stock_name: name,
                stocks
            });
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    }));
});
