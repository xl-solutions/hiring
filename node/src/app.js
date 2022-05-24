const express = require('express');
const server = express();
const webRoutes = require('./routes/webRoutes');
const path = require('path');
const cors = require('cors');

//settings
server.set('views', path.join(__dirname, 'views'));

//routes
server.use(cors());
server.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
server.use(webRoutes);

//middleware
server.use(express.json());

module.exports = server;