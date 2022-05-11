require('dotenv').config();

const express = require('express');
// const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const port = 3333;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`BACKEND SERVER ON =====> http://localhost:${port}`);
});
