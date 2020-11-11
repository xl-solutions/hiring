const api = require('../services/api');

exports.getLastPrice = async function (req, res) {
  try {
    const stockName = req.params.stock_name;
    const response = await api.get('/query', {
      params: {
        function: 'TIME_SERIES_MONTHLY',
        symbol: stockName,
        apikey: process.env.API_KEY,
      },
    });

    const data = response.data;

    if (data['Error Message']) {
      return res
        .status(404)
        .json({ message: 'As ações dessa empresa não foram encontradas' });
    }

    const name = data['Meta Data']['2. Symbol'];
    const lastDate = data['Meta Data']['3. Last Refreshed'];
    const lastPrice = +data['Monthly Time Series'][lastDate]['4. close'];
    const pricedAt = new Date(lastDate).toISOString();

    return res.status(200).json({
      name,
      lastPrice,
      pricedAt,
    });
  } catch (err) {
    res.send(err);
  }
};
