"use strict";

var _stokcsRepositoryRequestTest = require("../../repositories/request-test/stokcsRepositoryRequestTest");

var _AppError = require("../../../../shared/errors/AppError");

var _ListRecentQuotesUseCase = require("./ListRecentQuotesUseCase");

let listRecentQuotesUseCase;
let stokcsRepositoryRequestTest;
describe("Find by recent quotes", () => {
  beforeEach(() => {
    stokcsRepositoryRequestTest = new _stokcsRepositoryRequestTest.StocksRepositoryRequestTest();
    listRecentQuotesUseCase = new _ListRecentQuotesUseCase.ListRecentQuotesUseCase(stokcsRepositoryRequestTest);
  });
  it("should be able to list a recent quotes", async () => {
    let stock = "IBM";
    const quote = await listRecentQuotesUseCase.execute({
      stock_name: stock
    });
    expect(quote).toHaveProperty("name");
    expect(quote.name).toBe("IBM");
    expect(quote).toHaveProperty("lastPrice");
  });
  it("should not be able to list a recent quotes a name invalid", async () => {
    expect(async () => {
      let stock = "IB";
      await listRecentQuotesUseCase.execute({
        stock_name: stock
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});