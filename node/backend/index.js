'use strict';

const bodyParser = require('body-parser');
const app = require('express')();
const setupRoutes = require('./src/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setupRoutes(app);

const SERVER_PORT = 5000;

app.listen(SERVER_PORT, () => {
    console.log('Server has been started on port:', SERVER_PORT);
});
