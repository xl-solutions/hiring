const axios = require('axios');
const getKeyForObject = require('../../utils/getKeyForObject');

const getLatestPrice = (responseRequest, stock_name, keyListValues) => {
  const date = Object.keys(responseRequest[keyListValues]).filter((key, index) => {
    if (index == 0) return key;
  })[0];

  const lastPriceKey = Object.keys(responseRequest[keyListValues][date]).filter((key, index) => {
    if (key.includes('close')) return key;
  })[0];

  return {
    name: stock_name,
    lastPrice: responseRequest[keyListValues][date][lastPriceKey],
    priceAt: date,
  };
};

const handleQuote = async (params) => {
  let uri = `/query?`;
  uri += `function=TIME_SERIES_INTRADAY&`;
  uri += `symbol=${params.stock_name}&interval=5min&`;
  uri += `apikey=${process.env.API_KEY}`;

  const quote = await axios.get(process.env.API_BASE + uri, {
    json: true,
    headers: { 'User-Agent': 'request' },
  });

  const keyTimeSeries = getKeyForObject(quote.data);
  const latestPrice = getLatestPrice(quote.data, params.stock_name, keyTimeSeries);
  return latestPrice;
};

module.exports = { getLatestPrice, handleQuote };
