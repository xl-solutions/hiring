import request from 'supertest';
import app from '../../app';

import MockAdapter from 'axios-mock-adapter';
import alphaVantageApi from '../../api/alphaVantage';

const mock = new MockAdapter(alphaVantageApi);

describe('Stocks Test Suite', () => {
  it('should be able to return current stock information by name', async () => {
    mock
      .onGet('/query', {
        params: {
          symbol: 'IBM',
          function: 'GLOBAL_QUOTE',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
        },
      })
      .replyOnce(200, {
        'Global Quote': {
          '01. symbol': 'IBM',
          '02. open': '124.0700',
          '03. high': '122.0700',
          '04. low': '124.1400',
          '05. price': '130.5000',
          '06. volume': '6395700',
          '07. latest trading day': '2020-07-20',
          '08. previous close': '125.1100',
          '09. change': '1.2600',
          '10. change percent': '1.0071%',
        },
      });

    const response = await request(app).get(`/stocks/IBM/quote`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('IBM');
    expect(response.body.lastPrice).toEqual(130.5);
  });

  it('should be able to return stock history by name and interval', async () => {
    mock
      .onGet('/query', {
        params: {
          symbol: 'IBM',
          function: 'TIME_SERIES_DAILY',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
          outputsize: 'full',
        },
      })
      .replyOnce(200, {
        'Time Series (Daily)': {
          '2020-07-20': {
            '1. open': '126.0700',
            '2. high': '127.0700',
            '3. low': '125.1400',
            '4. close': '126.3700',
            '5. volume': '6395700',
          },
          '2020-07-17': {
            '1. open': '124.3900',
            '2. high': '125.6300',
            '3. low': '123.2000',
            '4. close': '125.1100',
            '5. volume': '3984000',
          },
          '2020-07-16': {
            '1. open': '122.6800',
            '2. high': '124.4800',
            '3. low': '122.1600',
            '4. close': '124.0100',
            '5. volume': '4328900',
          },
          '2020-07-15': {
            '1. open': '122.4000',
            '2. high': '123.9600',
            '3. low': '122.1500',
            '4. close': '123.0000',
            '5. volume': '4470100',
          },
          '2020-07-14': {
            '1. open': '118.6200',
            '2. high': '120.8900',
            '3. low': '117.9200',
            '4. close': '120.6000',
            '5. volume': '4531400',
          },
        },
      });

    const response = await request(app).get(`/stocks/IBM/history`).query({
      from: '2020-07-15',
      to: '2020-07-20',
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('IBM');
    expect(response.body.prices).toEqual(
      expect.arrayContaining([
        {
          opening: 122.68,
          low: 122.16,
          high: 124.48,
          closing: 124.01,
          priceAt: '2020-07-16',
        },
        {
          opening: 124.39,
          low: 123.2,
          high: 125.63,
          closing: 125.11,
          priceAt: '2020-07-17',
        },
      ]),
    );
  });

  it('should be able to compare stocks informations by names', async () => {
    mock
      .onGet('/query', {
        params: {
          symbol: 'IBM',
          function: 'GLOBAL_QUOTE',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
        },
      })
      .replyOnce(200, {
        'Global Quote': {
          '01. symbol': 'IBM',
          '02. open': '124.0700',
          '03. high': '122.0700',
          '04. low': '124.1400',
          '05. price': '130.5000',
          '06. volume': '6395700',
          '07. latest trading day': '2020-07-20',
          '08. previous close': '125.1100',
          '09. change': '1.2600',
          '10. change percent': '1.0071%',
        },
      });

    mock
      .onGet('/query', {
        params: {
          symbol: 'PETR4.SA',
          function: 'GLOBAL_QUOTE',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
        },
      })
      .replyOnce(200, {
        'Global Quote': {
          '01. symbol': 'PETR4.SA',
          '02. open': '124.0700',
          '03. high': '122.0700',
          '04. low': '124.1400',
          '05. price': '150.0000',
          '06. volume': '6395700',
          '07. latest trading day': '2020-07-20',
          '08. previous close': '125.1100',
          '09. change': '1.2600',
          '10. change percent': '1.0071%',
        },
      });

    const response = await request(app)
      .post('/stocks/IBM/compare')
      .send({
        stocks: ['PETR4.SA'],
      });

    expect(response.status).toBe(200);
    expect(response.body.lastPrices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'IBM',
          lastPrice: 130.5,
        }),
        expect.objectContaining({
          name: 'PETR4.SA',
          lastPrice: 150.0,
        }),
      ]),
    );
  });

  it('should be able to calculate stock gains by amount and date', async () => {
    mock
      .onGet('/query', {
        params: {
          symbol: 'IBM',
          function: 'TIME_SERIES_DAILY',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
          outputsize: 'full',
        },
      })
      .replyOnce(200, {
        'Time Series (Daily)': {
          '2020-07-20': {
            '1. open': '126.0700',
            '2. high': '127.0700',
            '3. low': '125.1400',
            '4. close': '126.3700',
            '5. volume': '6395700',
          },
          '2020-07-17': {
            '1. open': '124.3900',
            '2. high': '125.6300',
            '3. low': '123.2000',
            '4. close': '125.1100',
            '5. volume': '3984000',
          },
          '2020-07-16': {
            '1. open': '122.6800',
            '2. high': '124.4800',
            '3. low': '122.1600',
            '4. close': '124.0100',
            '5. volume': '4328900',
          },
          '2020-07-15': {
            '1. open': '122.4000',
            '2. high': '123.9600',
            '3. low': '122.1500',
            '4. close': '123.0000',
            '5. volume': '4470100',
          },
          '2020-07-14': {
            '1. open': '3.9700',
            '2. high': '3.9700',
            '3. low': '3.9700',
            '4. close': '3.9700',
            '5. volume': '4531400',
          },
        },
      });

    mock
      .onGet('/query', {
        params: {
          symbol: 'IBM',
          function: 'GLOBAL_QUOTE',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
        },
      })
      .replyOnce(200, {
        'Global Quote': {
          '01. symbol': 'IBM',
          '02. open': '4.3300',
          '03. high': '4.3300',
          '04. low': '4.3300',
          '05. price': '4.3300',
          '06. volume': '6395700',
          '07. latest trading day': '2020-07-20',
          '08. previous close': '125.1100',
          '09. change': '1.2600',
          '10. change percent': '1.0071%',
        },
      });

    const response = await request(app).get(`/stocks/IBM/gains`).query({
      purchasedAmount: 100,
      purchasedAt: '2020-07-14',
    });

    expect(response.status).toBe(200);
    expect(response.body.purchasedAmount).toEqual(100);
    expect(response.body.priceAtDate).toEqual(3.97);
    expect(response.body.lastPrice).toEqual(4.33);
    expect(response.body.capitalGains).toEqual(36);
  });

  it('should not be able to calculate stock with invalid date', async () => {
    mock
      .onGet('/query', {
        params: {
          symbol: 'IBM',
          function: 'TIME_SERIES_DAILY',
          apikey: process.env.ALPHA_VANTAGE_APIKEY,
          outputsize: 'full',
        },
      })
      .replyOnce(200, {
        'Time Series (Daily)': {
          '2020-07-20': {
            '1. open': '126.0700',
            '2. high': '127.0700',
            '3. low': '125.1400',
            '4. close': '126.3700',
            '5. volume': '6395700',
          },
          '2020-07-15': {
            '1. open': '122.4000',
            '2. high': '123.9600',
            '3. low': '122.1500',
            '4. close': '123.0000',
            '5. volume': '4470100',
          },
        },
      });

    const response = await request(app).get(`/stocks/IBM/gains`).query({
      purchasedAmount: 100,
      purchasedAt: '2020-07-14',
    });

    expect(response.status).toBe(400);
  });
});
