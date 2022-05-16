"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompareStocksUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _ConvertDateUtc = require("../../../../shared/provider/ConvertDateUtc");

var _ConvertNumbers = require("../../../../shared/provider/ConvertNumbers");

var _IStocksRepositoryRequest = require("../../repositories/IStocksRepositoryRequest");

var _dec, _dec2, _dec3, _dec4, _class;

let ListCompareStocksUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("StocksRepositoryRequest")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStocksRepositoryRequest.IStocksRepositoryRequest === "undefined" ? Object : _IStocksRepositoryRequest.IStocksRepositoryRequest]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCompareStocksUseCase {
  constructor(stocksRepositoryRequest) {
    this.stocksRepositoryRequest = stocksRepositoryRequest;
    this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
  }

  async execute({
    stock_name,
    stocks
  }) {
    stocks.unshift(stock_name);
    const compare = await this.stocksRepositoryRequest.compareStocks(stocks);
    const responseData = {};
    const lastPrices = [];
    let itens = {};

    for (let i = 0; i < compare.length; i++) {
      const responseBody = compare[i].data['Global Quote'];

      if (compare[i].data.Note) {
        throw new _AppError.AppError(this.messageError);
      } else {
        if (responseBody['01. symbol'] === undefined) {
          throw new _AppError.AppError(`Name Invalid: ${stocks[i]}`);
        }

        let name = responseBody['01. symbol'];
        let lastPrice = (0, _ConvertNumbers.convertAndParseFloat)(responseBody['05. price']);
        let date = responseBody['07. latest trading day'];
        let priceAt = (0, _ConvertDateUtc.convertDateToUTC)(date);

        if (name != undefined) {
          itens = {
            name: name,
            lastPrice: lastPrice,
            pricedAt: priceAt
          };
          lastPrices.push(itens);
        }
      }
    }

    if (lastPrices.length >= 1) {
      Object.assign(responseData, {
        lastPrice: lastPrices
      });
      return responseData;
    }
  }

}) || _class) || _class) || _class) || _class);
exports.ListCompareStocksUseCase = ListCompareStocksUseCase;