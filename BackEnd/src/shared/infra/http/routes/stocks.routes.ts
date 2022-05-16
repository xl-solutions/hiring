import { Router } from "express";

import { ListCompareStocksController } from "../../../../modules/stocks/useCases/listCompareStocks/ListCompareStocksController";
import { ListHistoricPricesController } from "../../../../modules/stocks/useCases/listHistoricPrices/ListHistoricPricesController";
import { ListProjectGainsController } from "../../../../modules/stocks/useCases/listProjectGains/ListProjectGainsController";
import { ListRecentQuotesController } from "../../../../modules/stocks/useCases/listRecentQuotes/ListRecentQuotesController";

const stocksRouter = Router();

const listRecentQuotesController = new ListRecentQuotesController();
const listHistoricPricesController = new ListHistoricPricesController();
const listCompareStocksController = new ListCompareStocksController();
const listProjectGainsController = new ListProjectGainsController();

stocksRouter.get("/:stock_name/quote", listRecentQuotesController.handle);

stocksRouter.get("/:stock_name/history", listHistoricPricesController.handle);

stocksRouter.get("/:stock_name/compare", listCompareStocksController.handle);

stocksRouter.get("/:stock_name/gains", listProjectGainsController.handle);

export { stocksRouter };