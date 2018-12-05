'use strict';

const Joi = require('joi');
const HttpError = require('http-errors');

class Validator {
    constructor() {
        this.ruleSets = {};
        this.before = {};
    }

    /**
     *
     * @param item
     * @param schemaName
     * @return {Promise.<{}>}
     * @private
     */
    _getBeforeSchema(item, schemaName) {
        const beforeReturn = this.before[schemaName]
            ? this.before[schemaName](item)
            : {};

        if (beforeReturn instanceof Promise) {
            return beforeReturn;
        }
        return Promise.resolve(beforeReturn);
    }

    /**
     * Validate object with rules defined base on the schema parameter.
     * @param {object} item Objeto da requisição
     * @param {string} schemaName Nome do grupo de regras a serem utilizadas
     * @return {Promise<object>}
     */
    validateRequest(item, schemaName) {
        const joiSchema = this.ruleSets[schemaName];
        if (!joiSchema) {
            return Promise.resolve({});
        }

        return this._getBeforeSchema(item, schemaName)
            .then((joiBeforeSchema) => {
                const validationSchema = Object.keys(joiBeforeSchema).length === 0
                    ? joiSchema
                    : joiSchema.concat(joiBeforeSchema);

                const res = Joi.validate(item, validationSchema, {
                    abortEarly: false,
                    convert: true,
                    stripUnknown: {
                        objects: true,
                    },
                });

                if (res.error) {
                    const msgs = res.error.details.map(error => error.message);
                    const err = HttpError(400, msgs.join(' and ').replace(/"/g, '\''), { expose: true, code: 400 });

                    return Promise.reject(err);
                }

                return Promise.resolve(res.value);
            });
    }
}

module.exports = Validator;
