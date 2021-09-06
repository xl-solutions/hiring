import axios from 'axios';

console.log(process.env.API_KEY);
console.log(process.env.INTERVAL);
console.log(process.env.SERIES_INTRADAY_EXTENDED);
const api = axios.create({
  baseURL: 'https://www.alphavantage.co/query?',
  params: {
    apikey: process.env.API_KEY,
    interval: process.env.INTERVAL,
  },
});

export { api };
