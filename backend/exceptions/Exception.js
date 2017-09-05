class Exception extends Error {
    constructor(httpCode = 500, code, message) {
        super(message);

        this._httpCode = httpCode;
        this._body = {
            code,
            message,
        }
    }

    getBody() {
        return this._body;
    }

    getHttpCode() {
        return this._httpCode;
    }
}

module.exports = Exception;