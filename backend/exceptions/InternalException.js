const Exception = require('./Exception');

class InternalException extends Exception {
    constructor(err) {
        super(500, 'internal-exception', 'Ops! Something went wrong');
    }
}

module.exports = InternalException;
