import axios from 'axios';

jest.mock('axios');

describe('Historical price by date', () => {
  it('should be able to get historical price', async () => {
    const symbol = 'FB';

    axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve());

    const searchHistorical = await axios.get(
      'https://www.alphavantage.co/query',
      {
        params: {
          apikey: '0WMS4COLI97WHGLP',
          function: 'TIME_SERIES_DAILY',
          symbol,
        },
      },
    );

    expect(searchHistorical.data).toHaveProperty('Time Series (Daily)');
  });
});
