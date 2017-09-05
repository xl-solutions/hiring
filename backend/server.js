const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes
app.use(require('./routes'));

app.listen(port);

console.log(`api is running on port ${port}`);

module.exports = app;
