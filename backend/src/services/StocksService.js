import request from 'request';

const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=PETR4.SA&interval=5min&apikey=S36E5NC9SNC9VEC6';

const requestGet = () => {
  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        console.log(data);
      }
  });
}

export default requestGet;