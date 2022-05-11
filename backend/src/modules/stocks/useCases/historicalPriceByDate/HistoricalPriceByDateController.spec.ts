import request from 'supertest';
import { app } from '../../../../app';

jest.setTimeout(300000);

describe('Historical price controller', () => {
  it('should be able to list historical price by date from stock', async () => {
    const stock_name = 'AAPL';
    const from = '2022-04-27';
    const to = '2022-05-05';

    const response = await request(app)
      .get(`/stocks/${stock_name}/history`)
      .query({ from, to });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('prices');
  });
});
