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
exports.ListCompareStocksController = void 0;
const tsyringe_1 = require("tsyringe");
const ListCompareStocksUseCase_1 = require("./ListCompareStocksUseCase");
class ListCompareStocksController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stock_name } = request.params;
            const { stocks } = request.body;
            const listCompareStocksUseCase = tsyringe_1.container.resolve(ListCompareStocksUseCase_1.ListCompareStocksUseCase);
            const compare = yield listCompareStocksUseCase.execute({
                stock_name,
                stocks
            });
            return response.json(compare);
        });
    }
}
exports.ListCompareStocksController = ListCompareStocksController;
