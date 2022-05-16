"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListHistoricPricesController = void 0;

var _tsyringe = require("tsyringe");

var _ListHistoricPricesUseCase = require("./ListHistoricPricesUseCase");

class ListHistoricPricesController {
  async handle(request, response) {
    const {
      stock_name
    } = request.params;
    const {
      from,
      to
    } = request.query;

    const listHistoricPricesUseCase = _tsyringe.container.resolve(_ListHistoricPricesUseCase.ListHistoricPricesUseCase);

    const historic = await listHistoricPricesUseCase.execute({
      stock_name: stock_name,
      from: from,
      to: to
    });
    return response.json(historic);
  }

}

exports.ListHistoricPricesController = ListHistoricPricesController;