const Joi = require('@hapi/joi');
class configSchema {
    quote() {
        return Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
        });
    }

    history() {
        return Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            query: Joi.object({
                from: Joi.string().isoDate().required(),
                to: Joi.string().isoDate().required(),
            }),
        });
    }

    compare() {
        return Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            body: Joi.object({
                stocks: Joi.array().items(Joi.string()).required(),
            }),
        });
    }

    gains() {
        return Joi.object({
            params: Joi.object({
                stock_name: Joi.string().required(),
            }),
            query: Joi.object({
                purchasedAmount: Joi.number().required().positive(),
                purchasedAt: Joi.string().isoDate().required(),
            }),
        });
    }
}

module.exports = configSchema;