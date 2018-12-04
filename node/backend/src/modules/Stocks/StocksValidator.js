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
    }
}

module.exports = StocksValidator;
