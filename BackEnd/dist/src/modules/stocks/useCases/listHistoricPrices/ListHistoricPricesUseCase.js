"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ListHistoricPricesUseCase = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
const ConvertDateUtc_1 = require("../../../../shared/provider/ConvertDateUtc");
const ConvertNumbers_1 = require("../../../../shared/provider/ConvertNumbers");
let ListHistoricPricesUseCase = class ListHistoricPricesUseCase {
    constructor(stocksRepositoryRequest) {
        this.stocksRepositoryRequest = stocksRepositoryRequest;
        this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
    }
    execute({ stock_name, from, to }) {
        return __awaiter(this, void 0, void 0, function* () {
            const historicPrices = yield this.stocksRepositoryRequest.findByHistoricPrices(stock_name, from, to);
            const responseData = {};
            const prices = [];
            let pricesObj = {};
            if (historicPrices.data['Error Message']) {
                throw new AppError_1.AppError("Name invalid");
            }
            if (historicPrices.data.Note) {
                throw new AppError_1.AppError(this.messageError);
            }
            const resposeHeader = historicPrices.data['Meta Data'];
            const responseBody = historicPrices.data['Time Series (Daily)'];
            const responseDates = Object.keys(responseBody);
            let symbolQuote = resposeHeader['2. Symbol'];
            let fromDate = (0, ConvertDateUtc_1.convertDate)(from);
            let toDate = (0, ConvertDateUtc_1.convertDate)(to);
            for (let i in responseDates) {
                let allDates = (0, ConvertDateUtc_1.convertDate)(responseDates[i]);
                if (responseBody[from] && responseBody[to]) {
                    if (allDates >= fromDate && allDates <= toDate) {
                        let opening = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody[responseDates[i]]["1. open"]);
                        let low = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody[responseDates[i]]["2. high"]);
                        let high = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody[responseDates[i]]["3. low"]);
                        let closing = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody[responseDates[i]]["4. close"]);
                        let priceAt = (0, ConvertDateUtc_1.convertDateToUTC)(responseDates[i]);
                        pricesObj = {
                            opening: opening,
                            low: low,
                            high: high,
                            closing: closing,
                            pricedAt: priceAt
                        };
                        prices.push(pricesObj);
                    }
                }
                else {
                    throw new AppError_1.AppError("Date invalid");
                }
            }
            Object.assign(responseData, {
                name: symbolQuote,
                prices: prices.reverse()
            });
            return responseData;
        });
    }
    ;
};
ListHistoricPricesUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("StocksRepositoryRequest")),
    __metadata("design:paramtypes", [Object])
], ListHistoricPricesUseCase);
exports.ListHistoricPricesUseCase = ListHistoricPricesUseCase;
