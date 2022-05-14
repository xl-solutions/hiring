import request from 'supertest';
import { app } from '../../../../app';

describe('Get last quote controller', () => {
  it('should be able to list current quote from stock', async () => {
    const response = await request(app).get(`/stocks/AAPL/quote`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('lastPrice');
  });
});
