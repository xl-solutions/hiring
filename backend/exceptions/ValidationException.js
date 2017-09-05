const Exception = require('./Exception');

class ValidationException extends Exception {
    constructor(message) {
        super(422, 'validation-exception', 'Houve erros de validação');
        this._body.validationErrors = message;
    }
}

module.exports = ValidationException;
