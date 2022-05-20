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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksRepositoryRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("../../../../shared/errors/AppError");
class StocksRepositoryRequest {
    // private tokenAPI = "demo";
    constructor() {
        this.tokenAPI = "EZ3IPW2YUAGT6T0O";
    }
    findByRecentQuotes(stock_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = axios_1.default.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                    .then(response => {
                    return response;
                })
                    .catch(error => {
                    return error;
                });
                return response;
            }
            catch (error) {
                throw new AppError_1.AppError(`Message error: ${error}`);
            }
        });
    }
    findByHistoricPrices(stock_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = axios_1.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                    .then(response => {
                    return response;
                })
                    .catch(error => {
                    return error;
                });
                return response;
            }
            catch (error) {
                throw new AppError_1.AppError(`Message error: ${error}`);
            }
        });
    }
    compareStocks(stocks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = [];
                for (let i in stocks) {
                    const response = yield axios_1.default.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=${this.tokenAPI}`, {})
                        .then(response => {
                        result.push(response);
                    })
                        .catch(error => {
                        return error;
                    });
                }
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    findByProjectGains(stock_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = axios_1.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {})
                    .then(response => {
                    return response;
                })
                    .catch(error => {
                    return error;
                });
                return response;
            }
            catch (error) {
                throw new AppError_1.AppError(`Message error: ${error}`);
            }
        });
    }
}
exports.StocksRepositoryRequest = StocksRepositoryRequest;
