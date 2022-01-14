const axios = require('axios');
const { API_KEY } = require('../configs/api');

const api = axios.create({
    baseURL: 'https://www.alphavantage.co',
})

api.interceptors.request.use(async (config) => {
    config.url += `&apikey=${API_KEY}`;
    return config;
  });
  
  module.exports = api;