'use strict';

const Joi = require('joi');

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
                    const errors = res.error.details.reduce((result, err) => {
                        result[err.context.key] = {
                            rule: err.type.replace(/\./g, '_'),
                            context: err.context,
                        };
                        return result;
                    }, {});

                    // @TODO: create a class of Exception to customize the response of http requests
                    return Promise.reject(new Error(errors));
                }

                return Promise.resolve(res.value);
            });
    }
}

module.exports = Validator;
