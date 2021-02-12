const axios = require('axios');

const axiosInstance = axios.create({
    baseURL:'https://www.alphavantage.co/',
});

module.exports = axiosInstance;