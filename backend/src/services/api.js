const axios = require('axios');

const api = axios.default.create({
    baseURL: process.env.API_URL,
})

module.exports = api;