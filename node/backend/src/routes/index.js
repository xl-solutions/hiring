'use strict';

const stocks = require('./stocks');

module.exports = (app) => {
    /** defining routes */
    app.use('/stocks', stocks);

    /** unexpected errors */
    app.use((_, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        res.status(500);
        res.send({ message: 'Internal server error' });
    });
};
