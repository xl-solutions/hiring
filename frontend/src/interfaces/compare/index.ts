import { QuoteData } from 'interfaces';

export interface CompareData {
  lastPrices: QuoteData[];
}

export interface ComparePayload {
  stocks: string[];
}
