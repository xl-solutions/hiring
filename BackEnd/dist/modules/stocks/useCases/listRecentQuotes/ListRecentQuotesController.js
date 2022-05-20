"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRecentQuotesController = void 0;

var _tsyringe = require("tsyringe");

var _ListRecentQuotesUseCase = require("./ListRecentQuotesUseCase");

class ListRecentQuotesController {
  async handle(request, response) {
    const {
      stock_name
    } = request.params;

    const listRecentQuotesUseCase = _tsyringe.container.resolve(_ListRecentQuotesUseCase.ListRecentQuotesUseCase);

    const recentQuotes = await listRecentQuotesUseCase.execute({
      stock_name
    });
    return response.json(recentQuotes);
  }

}

exports.ListRecentQuotesController = ListRecentQuotesController;