const { port } = require('./parameters');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { join } = require('path');
const routesPath = join(__dirname, '../routes');
module.exports = () => {
	app.set('port', port);
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
		next();
	  });
    app.use(bodyParser.json({
		type: 'application/json'
	}));
	fs.readdirSync(routesPath).forEach(file => require(join(routesPath, file))(app));
	app.use((err, req, res, next) => {
		console.log(err);
		return res.status(500).send('Internal error');
	});
    return app;
};