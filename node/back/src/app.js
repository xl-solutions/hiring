const express = require('express');
const server = express();
const webRoutes = require('./routes/webRoutes');
const path = require('path');
const cors = require('cors');

//settings
server.set('views', path.join(__dirname, 'views'));

//routes
server.use(cors());
server.use(webRoutes);

//middleware
server.use(express.json());

module.exports = server;