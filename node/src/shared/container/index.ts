import { container } from 'tsyringe';
import { IAlphaVantageDTO } from '@modules/alphavantage/entities/IAlphaVantageDTO';
import AlphaVantageService from '@modules/alphavantage/services/AlphaVantageService';

container.registerSingleton<IAlphaVantageDTO>(
  'AlphaVantageService',
  AlphaVantageService,
);
