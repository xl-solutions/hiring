import request from 'supertest';
import { app } from '../../../../app';

describe('Compare stocks controller', () => {
  it('should not be able to list last prices for stocks because limit requests free api', async () => {
    const stock_name = 'AAPL';
    const stocks = ['FB'];

    const response = await request(app)
      .post(`/stocks/${stock_name}/compare`)
      .send({ stocks });

    expect(response.status).toBe(500);
  });
});
