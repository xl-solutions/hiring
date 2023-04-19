import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: 'MARAEQTHHUDW2NMJ',
  },
});

export default instance;