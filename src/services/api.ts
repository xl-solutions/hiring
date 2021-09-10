import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.alphavantage.co/query?',
  params: {
    apikey: process.env.API_KEY,
    interval: process.env.INTERVAL,
  },
});

export { api };
