import axios from 'axios';
import {
  transformGlobalQuote,
  transformSeries,
  transformSymbolSearch,
  transformDailyAdjustedSeries,
} from '../utils/transformer';
import config from '../config/config.json';

export const searchStock = async keywords => {
  let request = await axios.get(config.apiUrl, {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords,
      apikey: config.apiKey,
    },
  });
  return transformSymbolSearch(request.data.bestMatches);
};

export const getLastQuote = async symbol => {
  let request = await axios.get(config.apiUrl, {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol,
      apikey: config.apiKey,
    },
  });
  return transformGlobalQuote(request.data['Global Quote']);
};

export const getIntradaySeries = async symbol => {
  let request = await axios.get(config.apiUrl, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      apikey: config.apiKey,
      interval: '5min',
    },
  });
  if (request.data['Error Message'] !== undefined) {
    return {errorMessage: 'This stock has no intraday data...'};
  } else {
    return transformSeries(request.data['Time Series (5min)']);
  }
};

export const getDailyAdjustedSeries = async symbol => {
  let request = await axios.get(config.apiUrl, {
    params: {
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol,
      apikey: config.apiKey,
      outputsize: 'full',
    },
  });

  if (request.data['Error Message'] !== undefined) {
    return {errorMessage: 'This stock has no daily adjusted data...'};
  } else {
    return transformDailyAdjustedSeries(request.data['Time Series (Daily)']);
  }
};

export const getDailySeries = async symbol => {
  let request = await axios.get(config.apiUrl, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      apikey: config.apiKey,
    },
  });
  if (request.data['Error Message'] !== undefined) {
    return {errorMessage: 'This stock has no daily data...'};
  } else {
    return transformSeries(request.data['Time Series (Daily)']);
  }
};
