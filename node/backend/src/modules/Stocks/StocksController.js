'use strict';

const StocksValidator = require('./StocksValidator');
const StocksModel = require('./StocksModel');

class StocksController {
    constructor() {
        this.validator = new StocksValidator();
        this.model = new StocksModel();
    }

    quote(req, res) {
        return this.model.quote(req.params.stock_name)
            .then((response) => {
                return res.status(200)
                    .send({
                        message: 'Get quote with success',
                        result: response,
                    });
            });
    }

    history(req, res) {
        return this.model.history(req.params.stock_name, req.query.from, req.query.to)
            .then((response) => {
                return res.status(200)
                    .send({
                        message: 'Get history with success',
                        result: response,
                    });
            });
    }

    compare(req, res) {
        return this.model.compare(req.params.stock_name, req.body.stocks)
            .then((response) => {
                return res.status(200)
                    .send({
                        message: 'Compare stocks',
                        result: response,
                    });
            });
    }

    gains(req, res) {
        return this.model.gains(req.params.stock_name, req.query.purchasedAmount, req.query.purchasedAt)
            .then((response) => {
                return res.status(200)
                    .send({
                        message: 'Get gains to stock',
                        result: response,
                    });
            });
    }
}

module.exports = StocksController;
