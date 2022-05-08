import axios from 'axios';

jest.mock('axios');

describe('Get last quote from stock', () => {
  it('should be able to get the last quote', async () => {
    const symbol = 'FB';

    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          'Global Quote': {
            '01. symbol': 'FB',
            '02. open': '207.3400',
            '03. high': '209.3800',
            '04. low': '201.0200',
            '05. price': '203.7700',
            '06. volume': '34747158',
            '07. latest trading day': '2022-05-06',
            '08. previous close': '208.2800',
            '09. change': '-4.5100',
            '10. change percent': '-2.1654%',
          },
        },
      }),
    );

    const searchQuote = await axios.get('https://www.alphavantage.co/query', {
      params: {
        apikey: '0WMS4COLI97WHGLP',
        function: 'GLOBAL_QUOTE',
        symbol,
      },
    });

    expect(searchQuote.data).toHaveProperty('Global Quote');
    expect(searchQuote.data['Global Quote']).toHaveProperty(['05. price']);
  });
});
