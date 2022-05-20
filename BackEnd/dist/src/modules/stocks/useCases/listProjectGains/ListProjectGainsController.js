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
exports.ListProjectGainsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListProjectGainsUseCase_1 = require("./ListProjectGainsUseCase");
class ListProjectGainsController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stock_name } = request.params;
            const { purchasedAmount, purchasedAt } = request.query;
            const listProjectGainsUseCase = tsyringe_1.container.resolve(ListProjectGainsUseCase_1.ListProjectGainsUseCase);
            const historic = yield listProjectGainsUseCase.execute({
                stock_name: stock_name,
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt
            });
            return response.json(historic);
        });
    }
}
exports.ListProjectGainsController = ListProjectGainsController;
