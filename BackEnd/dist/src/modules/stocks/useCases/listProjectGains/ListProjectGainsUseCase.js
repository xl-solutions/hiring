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
exports.ListProjectGainsUseCase = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
const ConvertNumbers_1 = require("../../../../shared/provider/ConvertNumbers");
let ListProjectGainsUseCase = class ListProjectGainsUseCase {
    constructor(stocksRepositoryRequest) {
        this.stocksRepositoryRequest = stocksRepositoryRequest;
        this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
        this.messageInvalidApi = "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY.";
    }
    execute({ stock_name, purchasedAmount, purchasedAt }) {
        return __awaiter(this, void 0, void 0, function* () {
            const historicPrices = yield this.stocksRepositoryRequest.findByProjectGains(stock_name, purchasedAmount, purchasedAt);
            if (historicPrices.data['Error Message']) {
                throw new AppError_1.AppError("Name invalid");
            }
            const projectGains = {};
            const resposeHeader = historicPrices.data['Meta Data'];
            const responseBody = historicPrices.data['Time Series (Daily)'];
            if (historicPrices.data.Note) {
                throw new AppError_1.AppError(this.messageError);
            }
            if (responseBody[purchasedAt] == undefined) {
                throw new AppError_1.AppError("Date invalid");
            }
            if (historicPrices.data['Error Message']) {
                throw new AppError_1.AppError(this.messageInvalidApi);
            }
            let symbolQuote = resposeHeader['2. Symbol'];
            let purchasedAmountNumber = Number(purchasedAmount);
            let priceAtDate = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody[purchasedAt]['4. close']);
            let lastPriceDate = resposeHeader['3. Last Refreshed'];
            let lastPrice = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody[lastPriceDate]['4. close']);
            let capitalGains = (lastPrice * purchasedAmountNumber) - (priceAtDate * purchasedAmountNumber);
            Object.assign(projectGains, {
                name: symbolQuote,
                purchasedAmount: purchasedAmountNumber,
                purchasedAt: purchasedAt,
                priceAtDate: priceAtDate,
                lastPrice: lastPrice,
                capitalGains: capitalGains
            });
            return projectGains;
        });
    }
    ;
};
ListProjectGainsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("StocksRepositoryRequest")),
    __metadata("design:paramtypes", [Object])
], ListProjectGainsUseCase);
exports.ListProjectGainsUseCase = ListProjectGainsUseCase;
