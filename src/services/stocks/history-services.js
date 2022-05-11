const axios = require('axios');
const getKeyForObject = require('../../utils/getKeyForObject');

const getHistoryPrices = (responseRequest, stock_name, keyListValues) => {
  const getPriceFromData = (object, keyForValue) => {
    return Object.entries(object).find(([key, value]) => key.includes(keyForValue) && value)[1];
  };
  return {
    name: stock_name,
    prices: Object.entries(responseRequest[keyListValues]).map(([key, value]) => {
      return {
        name: stock_name,
        prices: {
          opening: getPriceFromData(value, 'open'),
          low: getPriceFromData(value, 'low'),
          high: getPriceFromData(value, 'high'),
          closing: getPriceFromData(value, 'close'),
          pricedAt: key, // data no formato ISO 8601, UTC
        },
      };
    }),
  };
};

const handleHistory = async (params) => {
  let uri = `/query?`;
  uri += `function=TIME_SERIES_MONTHLY&`;
  uri += `symbol=${params.stock_name}&`;
  uri += `apikey=${process.env.API_KEY}`;

  console.log(uri);

  const quote = await axios.get(process.env.API_BASE + uri, {
    json: true,
    headers: { 'User-Agent': 'request' },
  });

  const keyTimeSeries = getKeyForObject(quote.data);
  const historyPrice = getHistoryPrices(quote.data, params.stock_name, keyTimeSeries);

  console.log(keyTimeSeries);
  console.log(historyPrice);
  return historyPrice;
};

module.exports = {
  getHistoryPrices,
  handleHistory,
};
