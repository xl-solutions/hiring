import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IAlphaVantageDTO } from '@modules/alphavantage/entities/IAlphaVantageDTO';
import { IRequest, IResponse, IGains } from '@modules/stocks/entities/IGainsDTO';

@injectable()
class GainsService implements IGains {
  constructor(
    @inject('AlphaVantageService')
    private alphaVantageService: IAlphaVantageDTO,
  ) {}
  public async execute({
    stock_name,
    purchasedAmount,
    purchasedAt,
  }: IRequest): Promise<IResponse> {
    const prices = await this.alphaVantageService.getPrices({ stock_name });

    if (!prices) {
      throw new AppError('gains not found');
    }

    if (Object.keys(prices).indexOf(purchasedAt) === -1) {
      throw new AppError('Not Found purchasedAt on stock');
    }
    const key = Object.keys(prices)[0]
    const lastPrice = Number(prices[key]['4. close']);
    const priceAtDate = Number(prices[purchasedAt]['4. close']);

    const gains = {
      name: stock_name,
      purchasedAmount,
      purchasedAt,
      priceAtDate,
      lastPrice: lastPrice,
      capitalGains: (lastPrice - priceAtDate) * Number(purchasedAmount),
    };

    return gains;
  }
}

export default GainsService;
