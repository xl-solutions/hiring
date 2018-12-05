'use strict';

const Joi = require('joi');
const Validator = require('../../core/Validator');

class StocksValidator extends Validator {
    constructor() {
        super();
        this.ruleSets.quote = Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
        });

        this.ruleSets.history = Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            query: Joi.object({
                from: Joi.date().iso().required(),
                to: Joi.date().iso().required(),
            }),
        });

        this.ruleSets.compare = Joi.object({
            body: Joi.object({
                stocks: Joi.array().min(1).items(Joi.string()).required(),
            }),
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
        });

        this.ruleSets.gains = Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            query: Joi.object({
                purchasedAmount: Joi.number().required(),
                purchasedAt: Joi.date().iso().required(),
            }),
        });
    }
}

module.exports = StocksValidator;
