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
exports.ListCompareStocksUseCase = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
const ConvertDateUtc_1 = require("../../../../shared/provider/ConvertDateUtc");
const ConvertNumbers_1 = require("../../../../shared/provider/ConvertNumbers");
let ListCompareStocksUseCase = class ListCompareStocksUseCase {
    constructor(stocksRepositoryRequest) {
        this.stocksRepositoryRequest = stocksRepositoryRequest;
        this.messageError = "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.";
    }
    execute({ stock_name, stocks }) {
        return __awaiter(this, void 0, void 0, function* () {
            stocks.unshift(stock_name);
            const compare = yield this.stocksRepositoryRequest.compareStocks(stocks);
            const responseData = {};
            const lastPrices = [];
            let itens = {};
            for (let i = 0; i < compare.length; i++) {
                const responseBody = compare[i].data['Global Quote'];
                if (compare[i].data.Note) {
                    throw new AppError_1.AppError(this.messageError);
                }
                else {
                    if (responseBody['01. symbol'] === undefined) {
                        throw new AppError_1.AppError(`Name Invalid: ${stocks[i]}`);
                    }
                    let name = responseBody['01. symbol'];
                    let lastPrice = (0, ConvertNumbers_1.convertAndParseFloat)(responseBody['05. price']);
                    let date = responseBody['07. latest trading day'];
                    let priceAt = (0, ConvertDateUtc_1.convertDateToUTC)(date);
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
        });
    }
};
ListCompareStocksUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("StocksRepositoryRequest")),
    __metadata("design:paramtypes", [Object])
], ListCompareStocksUseCase);
exports.ListCompareStocksUseCase = ListCompareStocksUseCase;
