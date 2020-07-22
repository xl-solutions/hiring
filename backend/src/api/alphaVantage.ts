import axios from 'axios';

const alphaVantageApi = axios.create({
  baseURL: process.env.ALPHA_VANTAGE_URL,
});

export default alphaVantageApi;
