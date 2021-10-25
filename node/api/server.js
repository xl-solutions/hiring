const express = require('express');
const cors = require("cors");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = require('express')();
require('dotenv/config');

var indexRouter = require('./routes/index');

var corsOptions = {
  origin: "http://localhost:3000", // dev frontend will consume
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//app.use(logger('dev'));
app.use(cors(corsOptions));// enabling cors for all requests by using cors middleware
app.use(express.json()); // only parses JSON and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: false })); // 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
