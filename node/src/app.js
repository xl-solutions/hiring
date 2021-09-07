const express = require("express");

const cors = require("cors");
const routes = require("./routes.js");

const app = express();

app.use(cors({ origin: true }));
app.use(routes);

module.exports = app;
