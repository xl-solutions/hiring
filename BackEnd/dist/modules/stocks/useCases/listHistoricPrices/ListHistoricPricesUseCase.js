"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListHistoricPricesUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _ConvertDateUtc = require("../../../../shared/provider/ConvertDateUtc");

var _ConvertNumbers = require("../../../../shared/provider/ConvertNumbers");

var _IStocksRepositoryRequest = require("../../repositories/IStocksRepositoryRequest");

var _dec, _dec2, _dec3, _dec4, _class;

let ListHistoricPricesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("StocksRepositoryRequest")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStocksRepositoryRequest.IStocksRepositoryRequest === "undefined" ? Object : _IStocksRepositoryRequest.IStocksRepositoryRequest]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListHistoricPricesUseCase {
  constructor(stocksRepositoryRequest) {
    this.stocksRepositoryRequest = stocksRepositoryRequest;
    this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
  }

  async execute({
    stock_name,
    from,
    to
  }) {
    const historicPrices = await this.stocksRepositoryRequest.findByHistoricPrices(stock_name, from, to);
    const responseData = {};
    const prices = [];
    let pricesObj = {};

    if (historicPrices.data['Error Message']) {
      throw new _AppError.AppError("Name invalid");
    }

    if (historicPrices.data.Note) {
      throw new _AppError.AppError(this.messageError);
    }

    const resposeHeader = historicPrices.data['Meta Data'];
    const responseBody = historicPrices.data['Time Series (Daily)'];
    const responseDates = Object.keys(responseBody);
    let symbolQuote = resposeHeader['2. Symbol'];
    let fromDate = (0, _ConvertDateUtc.convertDate)(from);
    let toDate = (0, _ConvertDateUtc.convertDate)(to);

    for (let i in responseDates) {
      let allDates = (0, _ConvertDateUtc.convertDate)(responseDates[i]);

      if (responseBody[from] && responseBody[to]) {
        if (allDates >= fromDate && allDates <= toDate) {
          let opening = (0, _ConvertNumbers.convertAndParseFloat)(responseBody[responseDates[i]]["1. open"]);
          let low = (0, _ConvertNumbers.convertAndParseFloat)(responseBody[responseDates[i]]["2. high"]);
          let high = (0, _ConvertNumbers.convertAndParseFloat)(responseBody[responseDates[i]]["3. low"]);
          let closing = (0, _ConvertNumbers.convertAndParseFloat)(responseBody[responseDates[i]]["4. close"]);
          let priceAt = (0, _ConvertDateUtc.convertDateToUTC)(responseDates[i]);
          pricesObj = {
            opening: opening,
            low: low,
            high: high,
            closing: closing,
            pricedAt: priceAt
          };
          prices.push(pricesObj);
        }
      } else {
        throw new _AppError.AppError("Date invalid");
      }
    }

    Object.assign(responseData, {
      name: symbolQuote,
      prices: prices.reverse()
    });
    return responseData;
  }

}) || _class) || _class) || _class) || _class);
exports.ListHistoricPricesUseCase = ListHistoricPricesUseCase;