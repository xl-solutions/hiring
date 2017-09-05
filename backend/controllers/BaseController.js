const Exception = require('../exceptions/Exception');
const InternalException = require('../exceptions/InternalException');

class BaseController {
    registerAction(action) {
        const methodName = action.name;

        return (req, res) => {
            const rawRequest = {
                query: req.query || {},
                params: req.params || {},
                body: req.body || {}
            };

            res.setHeader('Access-Control-Allow-Origin', '*');

            const validate = this.validator ?
                this.validator.validate(rawRequest, methodName) :
                Promise.resolve(rawRequest);

            const bindControllerAction = action.bind(this);

            return validate
                .then((reqValidated) => {
                    return bindControllerAction(reqValidated, res);
                })
                .catch((err) => {
                    console.log(err);
                    if (!(err instanceof Exception)) {
                        err = new InternalException(err);
                    }

                    res.status(err.getHttpCode()).json(err.getBody());
                })
        };

    }
}

module.exports = BaseController;
