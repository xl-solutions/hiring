const axios = require('axios');

const api = axios.create({
    baseURL: 'https://www.alphavantage.co',
})

api.interceptors.request.use(async(config) => {
    config.url += `&apikey=${process.env.API_KEY}`;
    return config
});

module.exports = api;