export default {
  // get: jest.fn().mockResolvedValue({ data: { bestMatches: [] } }),
  get: jest.fn(url => {
    if (url === '') {
      return Promise.resolve({
        data: {
          bestMatches: [
            {
              '1. symbol': 'TSCO.LON',
              '2. name': 'Tesco PLC',
              '3. type': 'Equity',
              '4. region': 'United Kingdom',
              '5. marketOpen': '08:00',
              '6. marketClose': '16:30',
              '7. timezone': 'UTC+01',
              '8. currency': 'GBX',
              '9. matchScore': '0.7273',
            },
          ],
        },
      });
    }
  }),

  create: jest.fn(function () {
    return this;
  }),
};
