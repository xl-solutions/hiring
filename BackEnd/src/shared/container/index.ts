import { container } from "tsyringe";

import { IStocksRepositoryRequest } from "../../modules/stocks/repositories/IStocksRepositoryRequest";
import { StocksRepositoryRequest } from "../../modules/stocks/repositories/request-data-stocks/stokcsRepositoryRequest";

container.registerSingleton<IStocksRepositoryRequest>(
    "StocksRepositoryRequest", 
    StocksRepositoryRequest 
);