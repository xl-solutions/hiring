const Joi = require('@hapi/joi');

module.exports = schema => (req, res, next) => {
    const result = Joi.validate(req, schema, {
        abortEarly: false,
        stripUnknown: {
            objects: true,
        },
    });

    if (result.error)
        return res.status(400).send({ error: result.error.details[0].message });

    next();
};
