import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: process.env.ALPHA_VANTAGE_API_KEY,
  },
});

export { api };
