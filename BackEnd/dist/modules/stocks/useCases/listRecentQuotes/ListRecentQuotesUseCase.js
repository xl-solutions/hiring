"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRecentQuotesUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _ConvertDateUtc = require("../../../../shared/provider/ConvertDateUtc");

var _ConvertNumbers = require("../../../../shared/provider/ConvertNumbers");

var _IStocksRepositoryRequest = require("../../repositories/IStocksRepositoryRequest");

var _dec, _dec2, _dec3, _dec4, _class;

let ListRecentQuotesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("StocksRepositoryRequest")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStocksRepositoryRequest.IStocksRepositoryRequest === "undefined" ? Object : _IStocksRepositoryRequest.IStocksRepositoryRequest]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListRecentQuotesUseCase {
  constructor(stocksRepositoryRequest) {
    this.stocksRepositoryRequest = stocksRepositoryRequest;
    this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
  }

  async execute({
    stock_name
  }) {
    const quotes = await this.stocksRepositoryRequest.findByRecentQuotes(stock_name);
    const responseData = {};
    const responseBody = quotes.data['Global Quote'];

    if (quotes.data.Note) {
      throw new _AppError.AppError(this.messageError);
    }

    let symbol = responseBody['01. symbol'];
    let lastPrice = (0, _ConvertNumbers.convertAndParseFloat)(responseBody['05. price']);
    let priceAt = (0, _ConvertDateUtc.convertDateToUTC)(responseBody['07. latest trading day']);

    if (symbol != undefined) {
      Object.assign(responseData, {
        name: symbol,
        lastPrice: lastPrice,
        pricedAt: priceAt
      });
      return responseData;
    }

    if (responseBody) {
      throw new _AppError.AppError("Stock name invalid");
    }
  }

}) || _class) || _class) || _class) || _class);
exports.ListRecentQuotesUseCase = ListRecentQuotesUseCase;