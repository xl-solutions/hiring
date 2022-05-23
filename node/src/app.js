const express = require('express');
const server = express();
const webRoutes = require('./routes/webRoutes');

//routes
server.use(webRoutes);

module.exports = server;