import request from 'supertest';
import { app } from '../../../../app';

describe('Search stocks controller', () => {
  it('should be able to list stocks by search term', async () => {
    const symbol = 'AAPL';

    const response = await request(app).get(`/stocks/search`).query({ symbol });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('company');
  });
});
