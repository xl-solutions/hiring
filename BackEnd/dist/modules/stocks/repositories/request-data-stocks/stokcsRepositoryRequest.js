"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StocksRepositoryRequest = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _AppError = require("../../../../shared/errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StocksRepositoryRequest {
  // private tokenAPI = "demo";
  constructor() {
    this.tokenAPI = "EZ3IPW2YUAGT6T0O";
  }

  async findByRecentQuotes(stock_name) {
    try {
      const response = _axios.default.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${this.tokenAPI}`, {}).then(response => {
        return response;
      }).catch(error => {
        return error;
      });

      return response;
    } catch (error) {
      throw new _AppError.AppError(`Message error: ${error}`);
    }
  }

  async findByHistoricPrices(stock_name) {
    try {
      const response = _axios.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {}).then(response => {
        return response;
      }).catch(error => {
        return error;
      });

      return response;
    } catch (error) {
      throw new _AppError.AppError(`Message error: ${error}`);
    }
  }

  async compareStocks(stocks) {
    try {
      let result = [];

      for (let i in stocks) {
        const response = await _axios.default.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=${this.tokenAPI}`, {}).then(response => {
          result.push(response);
        }).catch(error => {
          return error;
        });
      }

      return result;
    } catch (error) {
      return error;
    }
  }

  async findByProjectGains(stock_name) {
    try {
      const response = _axios.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=${this.tokenAPI}`, {}).then(response => {
        return response;
      }).catch(error => {
        return error;
      });

      return response;
    } catch (error) {
      throw new _AppError.AppError(`Message error: ${error}`);
    }
  }

}

exports.StocksRepositoryRequest = StocksRepositoryRequest;