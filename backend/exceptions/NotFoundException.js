const Exception = require('./Exception');

class NotFoundException extends Exception {
    constructor(message) {
        super(404, 'not-found-exception', message);
    }
}

module.exports = NotFoundException;
