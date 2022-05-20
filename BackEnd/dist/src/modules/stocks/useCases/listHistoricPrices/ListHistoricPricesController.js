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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListHistoricPricesController = void 0;
const tsyringe_1 = require("tsyringe");
const ListHistoricPricesUseCase_1 = require("./ListHistoricPricesUseCase");
class ListHistoricPricesController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stock_name } = request.params;
            const { from, to } = request.query;
            const listHistoricPricesUseCase = tsyringe_1.container.resolve(ListHistoricPricesUseCase_1.ListHistoricPricesUseCase);
            const historic = yield listHistoricPricesUseCase.execute({
                stock_name: stock_name,
                from: from,
                to: to
            });
            return response.json(historic);
        });
    }
}
exports.ListHistoricPricesController = ListHistoricPricesController;
