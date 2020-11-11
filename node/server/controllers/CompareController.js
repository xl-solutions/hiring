const api = require('../services/api');

exports.getCompare = async function (req, res) {
  const stocksToCompare = [...req.body.stocks, req.params.stock_name];
  const lastPrices = [];
  const errors = [];

  for (let stock of stocksToCompare) {
    try {
      const response = await api.get('/query', {
        params: {
          function: 'TIME_SERIES_MONTHLY',
          symbol: stock,
          apikey: process.env.API_KEY,
        },
      });

      const data = response.data;

      if (data['Error Message']) {
        errors.push(`As ações da empresa ${stock} não foram encontradas`);
      }

      const lastDate = data['Meta Data']['3. Last Refreshed'];
      const lastPrice = +data['Monthly Time Series'][lastDate]['4. close'];
      const pricedAt = new Date(lastDate).toISOString();

      lastPrices.push({
        name: stock,
        lastPrice,
        pricedAt,
      });
    } catch (err) {
      errors.push(err);
    }
  }

  if (errors.length) {
    return res.send({ errors });
  }

  return res.status(200).json(lastPrices);
};
