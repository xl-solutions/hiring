const axios = require('axios');
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

const api = {
  get(endpoint, options) {
    return axiosInstance.get(endpoint, options);
  },
};

module.exports = api;
