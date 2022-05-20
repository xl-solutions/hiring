"use strict";

var _stokcsRepositoryRequestTest = require("../../repositories/request-test/stokcsRepositoryRequestTest");

var _AppError = require("../../../../shared/errors/AppError");

var _ListCompareStocksUseCase = require("./ListCompareStocksUseCase");

let listCompareStocksUseCase;
let stokcsRepositoryRequestTest;
describe("Compare stocks", () => {
  beforeEach(() => {
    stokcsRepositoryRequestTest = new _stokcsRepositoryRequestTest.StocksRepositoryRequestTest();
    listCompareStocksUseCase = new _ListCompareStocksUseCase.ListCompareStocksUseCase(stokcsRepositoryRequestTest);
  });
  it("should be able to compare stocks", async () => {
    let stock = "OIBR4.SA";
    let stocks = ["TIMP3.SA", "VIVT4.SA"];
    const compare = await listCompareStocksUseCase.execute({
      stock_name: stock,
      stocks
    });
    expect(compare).toHaveProperty("lastPrice");
    expect(compare.lastPrice[0]).toHaveProperty('name');
    expect(compare.lastPrice[0]).toHaveProperty('lastPrice');
    expect(compare.lastPrice[0]).toHaveProperty('pricedAt');
    expect(compare.lastPrice.length).toBeGreaterThanOrEqual(1);
  });
  it("should not be able to compare stocks a name invalid", async () => {
    expect(async () => {
      let stock = "OIBR4.S";
      let stocks = ["TIMP3.SA", "VIVT4.SA"];
      await listCompareStocksUseCase.execute({
        stock_name: stock,
        stocks
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
  it("should not be able to compare stocks a max 5 calls", async () => {
    expect(async () => {
      let name = "OIBR4.SA";
      let stocks = ["TIMP3.SA", "VIVT4.SA"];
      await listCompareStocksUseCase.execute({
        stock_name: name,
        stocks
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});