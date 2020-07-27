const express = require("express");
const consign = require("consign");
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function (){
    let app = express();
    app.debug = process.env.NODE_DEBUG || false;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', express.static('static'));
    app.use(require('method-override')());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        app.use(cors());
        next();
    });
    consign({cwd: 'app', verbose: false})
        .then("controllers")
        .then("routes")
        .into(app);
    return app;
};
