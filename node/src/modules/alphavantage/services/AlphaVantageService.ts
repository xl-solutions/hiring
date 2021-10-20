import {
  IAlphaVantageDTO,
  IRequest,
  IResponse,
  IResponseLatest,
} from '@modules/alphavantage/entities/IAlphaVantageDTO';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

class AlphaVantageService implements IAlphaVantageDTO {
  private url(
    stock_name: string,
    function_name: string = 'TIME_SERIES_DAILY_ADJUSTED',
  ): string {
    return `${process.env.ALPHA_API_URL}/query?function=${function_name}&symbol=${stock_name}&interval=5min&outputsize=full&apikey=${process.env.ALPHA_API_KEY}`;
  }

  public async getPrices({ stock_name }: IRequest): Promise<IResponse> {
    const { data }: { data: any } = await axios.get(this.url(stock_name));
    const prices: IResponse = data['Time Series (Daily)'];
    
    if (data['Error Message']) {
      throw new AppError(`Stock not found`, 401);
    }

    if (!prices) {
      throw new AppError('Not possible get operation');
    }

    return prices;
  }

  public async getLatest({ stock_name }: IRequest): Promise<IResponseLatest> {
    const { data }: { data: any } = await axios.get(
      this.url(stock_name, 'GLOBAL_QUOTE'),
    );

    if (data['Note']) {
      throw new AppError('API call frequency is 5 calls per minute');
    }

    if (!data['Global Quote']) {
      throw new AppError('Error unknown');
    }

    if (Object.keys(data['Global Quote']).length === 0) {
      throw new AppError(`Stock not found`, 401);
    }

    const price: IResponseLatest = data['Global Quote'];

    return price;
  }
}

export default AlphaVantageService;
