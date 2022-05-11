import request from 'supertest';
import { app } from '../../../../app';

describe('Gains By Purchase controller', () => {
  it('should be able to list capital gains for purchase on specific date', async () => {
    const stock_name = 'AAPL';
    const purchasedAmount = 10;
    const purchasedAt = '2022-04-25';

    const response = await request(app)
      .get(`/stocks/${stock_name}/gains`)
      .query({ purchasedAmount, purchasedAt });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('capitalGains');
  });
});
