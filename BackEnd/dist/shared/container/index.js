"use strict";

var _tsyringe = require("tsyringe");

var _stokcsRepositoryRequest = require("../../modules/stocks/repositories/request-data-stocks/stokcsRepositoryRequest");

_tsyringe.container.registerSingleton("StocksRepositoryRequest", _stokcsRepositoryRequest.StocksRepositoryRequest);