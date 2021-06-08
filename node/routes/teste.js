require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
var cors = require('cors')


const validateWith = require('../validator/validator');
const schemaConfig = require('../validator/config');

const app = express();
const config = new schemaConfig();
app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(cors())


app.get('/', (req, res) => {
    return res.json('Hurray!!')
})

module.exports = app;
