import request from 'supertest';
import { app } from '../../../../app';

describe('Historical price controller', () => {
  it('should be able to list historical price by date from stock', async () => {
    const stock_name = 'AAPL';
    const response = await request(app).get(`/stocks/${stock_name}/history`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('prices');
  });
});
