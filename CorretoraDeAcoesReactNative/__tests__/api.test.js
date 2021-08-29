import {
  getDailyAdjustedSeries,
  getDailySeries,
  getIntradaySeries,
  getLastQuote,
  searchStock,
} from '../src/wrapper/api';

jest.setTimeout(30000);

test('should array containing IBM data', async () => {
  const data = await searchStock('IBM');
  expect(data).toEqual(
    expect.arrayContaining([
      {
        currency: 'USD',
        name: 'International Business Machines Corp',
        region: 'United States',
        symbol: 'IBM',
        type: 'Equity',
      },
    ]),
  );
});

test('should quote for IBM stock', async () => {
  const data = await getLastQuote('IBM');
  expect(data).toEqual(
    expect.objectContaining({
      symbol: 'IBM',
    }),
  );
});

test('should return array of intraday series', async () => {
  const data = await getIntradaySeries('IBM');
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        date: expect.anything(),
        open: expect.anything(),
        high: expect.anything(),
        low: expect.anything(),
        close: expect.anything(),
      }),
    ]),
  );
});

test('should return array of daily adjusted series', async () => {
  const data = await getDailyAdjustedSeries('IBM');
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        date: expect.anything(),
        open: expect.anything(),
        high: expect.anything(),
        low: expect.anything(),
        close: expect.anything(),
      }),
    ]),
  );
});

test('should return array of daily series', async () => {
  const data = await getDailySeries('IBM');
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        date: expect.anything(),
        open: expect.anything(),
        high: expect.anything(),
        low: expect.anything(),
        close: expect.anything(),
      }),
    ]),
  );
});
