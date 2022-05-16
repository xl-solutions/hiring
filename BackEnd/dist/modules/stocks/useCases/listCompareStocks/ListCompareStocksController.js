"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCompareStocksController = void 0;

var _tsyringe = require("tsyringe");

var _ListCompareStocksUseCase = require("./ListCompareStocksUseCase");

class ListCompareStocksController {
  async handle(request, response) {
    const {
      stock_name
    } = request.params;
    const {
      stocks
    } = request.body;

    const listCompareStocksUseCase = _tsyringe.container.resolve(_ListCompareStocksUseCase.ListCompareStocksUseCase);

    const compare = await listCompareStocksUseCase.execute({
      stock_name,
      stocks
    });
    return response.json(compare);
  }

}

exports.ListCompareStocksController = ListCompareStocksController;