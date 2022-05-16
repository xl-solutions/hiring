"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListProjectGainsUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _ConvertNumbers = require("../../../../shared/provider/ConvertNumbers");

var _IStocksRepositoryRequest = require("../../repositories/IStocksRepositoryRequest");

var _dec, _dec2, _dec3, _dec4, _class;

let ListProjectGainsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("StocksRepositoryRequest")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStocksRepositoryRequest.IStocksRepositoryRequest === "undefined" ? Object : _IStocksRepositoryRequest.IStocksRepositoryRequest]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProjectGainsUseCase {
  constructor(stocksRepositoryRequest) {
    this.stocksRepositoryRequest = stocksRepositoryRequest;
    this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
    this.messageInvalidApi = "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY.";
  }

  async execute({
    stock_name,
    purchasedAmount,
    purchasedAt
  }) {
    const historicPrices = await this.stocksRepositoryRequest.findByProjectGains(stock_name, purchasedAmount, purchasedAt);

    if (historicPrices.data['Error Message']) {
      throw new _AppError.AppError("Name invalid");
    }

    const projectGains = {};
    const resposeHeader = historicPrices.data['Meta Data'];
    const responseBody = historicPrices.data['Time Series (Daily)'];

    if (historicPrices.data.Note) {
      throw new _AppError.AppError(this.messageError);
    }

    if (responseBody[purchasedAt] == undefined) {
      throw new _AppError.AppError("Date invalid");
    }

    if (historicPrices.data['Error Message']) {
      throw new _AppError.AppError(this.messageInvalidApi);
    }

    let symbolQuote = resposeHeader['2. Symbol'];
    let purchasedAmountNumber = Number(purchasedAmount);
    let priceAtDate = (0, _ConvertNumbers.convertAndParseFloat)(responseBody[purchasedAt]['4. close']);
    let lastPriceDate = resposeHeader['3. Last Refreshed'];
    let lastPrice = (0, _ConvertNumbers.convertAndParseFloat)(responseBody[lastPriceDate]['4. close']);
    let capitalGains = lastPrice * purchasedAmountNumber - priceAtDate * purchasedAmountNumber;
    Object.assign(projectGains, {
      name: symbolQuote,
      purchasedAmount: purchasedAmountNumber,
      purchasedAt: purchasedAt,
      priceAtDate: priceAtDate,
      lastPrice: lastPrice,
      capitalGains: capitalGains
    });
    return projectGains;
  }

}) || _class) || _class) || _class) || _class);
exports.ListProjectGainsUseCase = ListProjectGainsUseCase;