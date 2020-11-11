const api = require('../services/api');

exports.getHistory = async function (req, res) {
  try {
    const stockName = req.params.stock_name;
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);

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

    const prices = [];
    const stockList = Object.keys(data['Monthly Time Series']);

    const filteredStockList = stockList.filter((month) => {
      const stockDate = new Date(month).getTime();
      return stockDate >= from.getTime() && stockDate <= to.getTime();
    });

    if (filteredStockList.length) {
      for (let key of filteredStockList) {
        const currentAction = data['Monthly Time Series'][key];
        const stock = {
          opening: +currentAction['1. open'],
          low: +currentAction['2. high'],
          high: +currentAction['3. low'],
          closing: +currentAction['4. close'],
          pricedAt: new Date(key).toISOString(),
        };
        prices.push(stock);
      }

      return res.status(200).json({
        name: stockName,
        prices,
      });
    }

    return res.status(200).json({
      message: 'Não foi encontrada nenhuma ação nesse intervalo de datas.',
    });
  } catch (err) {
    res.send(err);
  }
};
