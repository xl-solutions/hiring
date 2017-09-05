const Joi = require('joi');
const ValidationException = require('../exceptions/ValidationException');

class BaseValidator {
    constructor() {
        this.ruleSets = {};
    }

    validate(data, ruleSet) {
       const joiSchema = this.ruleSets[ruleSet];

       if (!joiSchema) {
           return Promise.resolve({});
       }

       const validateResult = Joi.validate(data, joiSchema, {
           abortEarly: false,
           stripUnknown: {
               objects: true,
           },
       });

       if (validateResult.error) {
           return Promise.reject(new ValidationException(validateResult.error.details));
       }

       return Promise.resolve(validateResult.value);
    }
}

module.exports = BaseValidator;
