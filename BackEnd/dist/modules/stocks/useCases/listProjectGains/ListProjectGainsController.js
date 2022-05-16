"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListProjectGainsController = void 0;

var _tsyringe = require("tsyringe");

var _ListProjectGainsUseCase = require("./ListProjectGainsUseCase");

class ListProjectGainsController {
  async handle(request, response) {
    const {
      stock_name
    } = request.params;
    const {
      purchasedAmount,
      purchasedAt
    } = request.query;

    const listProjectGainsUseCase = _tsyringe.container.resolve(_ListProjectGainsUseCase.ListProjectGainsUseCase);

    const historic = await listProjectGainsUseCase.execute({
      stock_name: stock_name,
      purchasedAmount: purchasedAmount,
      purchasedAt: purchasedAt
    });
    return response.json(historic);
  }

}

exports.ListProjectGainsController = ListProjectGainsController;