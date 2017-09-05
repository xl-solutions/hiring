const Joi = require('joi');
const BaseValidator = require('./BaseValidator');

class StockValidator extends BaseValidator {
    constructor() {
        super();

        this.ruleSets.getQuotes = Joi.object({
            params: Joi.object({
               stock_name: Joi.string().required(),
            }),
        });

        this.ruleSets.getHistory = Joi.object({
            params: Joi.object({
               stock_name: Joi.string().required(),
            }),
            query: Joi.object({
                from: Joi.string().isoDate().required(),
                to: Joi.string().isoDate().required(),
            }),
        });

        this.ruleSets.compareStocks = Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            body: Joi.object({
                stocks: Joi.array().items(Joi.string()).required(),
            }),
        });

        this.ruleSets.projectGains = Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            query: Joi.object({
                purchasedAmount: Joi.number().required(),
                purchasedAt: Joi.string().isoDate().required(),
            }),
        });
    }
}

module.exports = StockValidator;
