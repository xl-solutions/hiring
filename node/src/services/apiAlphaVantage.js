const axios = require("axios");
const { API_KEY } = require("../configs/apiConfig");

const api = axios.create({
  baseURL: "https://www.alphavantage.co",
});

api.interceptors.request.use(async (config) => {
  let apiUrl = `${config.url}&apikey=${API_KEY}`;
  return apiUrl;
});

module.exports = api;
