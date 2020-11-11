const api = require('../services/api');

exports.getPurchase = async function (req, res) {
  const stockName = req.params.stock_name;
  const purchasedAmount = +req.query.purchasedAmount;
  const purchasedAt = req.query.purchasedAt;
  const errors = [];

  try {
    const response = await api.get('/query', {
      params: {
        function: 'TIME_SERIES_MONTHLY',
        symbol: stockName,
        apikey: process.env.API_KEY,
      },
    });

    const data = response.data;

    if (data['Error Message']) {
      errors.push({
        message: `As ações da empresa ${stockName} não foram encontradas`,
      });
    }

    const validDates = Object.keys(data['Monthly Time Series']);

    if (validDates.indexOf(purchasedAt) !== -1) {
      const lastDate = data['Meta Data']['3. Last Refreshed'];
      const priceAtDate = +data['Monthly Time Series'][purchasedAt]['4. close'];
      const lastPrice = +data['Monthly Time Series'][lastDate]['4. close'];
      const oldGains = purchasedAmount * priceAtDate;
      const actualGains = purchasedAmount * lastPrice;
      const capitalGains = actualGains - oldGains;

      return res.status(200).json({
        name: stockName,
        purchasedAmount,
        purchasedAt: new Date(purchasedAt).toISOString(),
        priceAtDate,
        lastPrice,
        capitalGains,
      });
    }

    errors.push({ message: 'Não foram encontradas ações nessta data' });
  } catch (err) {
    errors.push(err);
  }

  if (errors.length) {
    return res.status(404).send({ errors });
  }
};
