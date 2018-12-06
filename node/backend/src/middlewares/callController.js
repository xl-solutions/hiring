'use strict';

module.exports = (Controller, methodName) => {
    return (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        const controller = new Controller();

        if (res.locals.authorizedUser) {
            controller.authorizedUser = res.locals.authorizedUser;
        }

        const validatePromise = controller.validator
            ? controller.validator.validateRequest(req, methodName)
            : Promise.resolve(req);

        return validatePromise
            .then((validated) => {
                const send = res.send.bind(res);
                res.send = (body) => {
                    return send.call(this, body);
                };

                return controller[methodName](validated, res);
            })
            .catch((err) => {
                console.log('ERROR', err);
                const body = typeof err.body !== 'undefined' ? err.body : { message: err.message, status: false };
                const code = typeof err.code !== 'undefined' ? err.code : 500;
                res.status(code).send(body);
            });
    };
};
