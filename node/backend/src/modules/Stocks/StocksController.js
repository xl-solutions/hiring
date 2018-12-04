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
                return res.status(201)
                    .send({
                        message: 'category-created',
                        result: response,
                    });
            });
    }
}

module.exports = StocksController;
