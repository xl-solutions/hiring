"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const stokcsRepositoryRequest_1 = require("../../modules/stocks/repositories/request-data-stocks/stokcsRepositoryRequest");
tsyringe_1.container.registerSingleton("StocksRepositoryRequest", stokcsRepositoryRequest_1.StocksRepositoryRequest);
