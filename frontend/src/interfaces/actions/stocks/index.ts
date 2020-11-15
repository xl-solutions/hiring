import { MetaData, QuoteData, QuoteHistoryData } from 'interfaces';
import { CompareData, ComparePayload } from 'interfaces/compare';
import { ProjectionData } from 'interfaces/projection';

export interface RequestQuoteAction {
  data: string;
  type: string;
  meta?: MetaData;
}

export interface RequestQuoteActionSuccess {
  data: QuoteData;
  type: string;
}

export interface RequestHistoryParams {
  stockName: string;
  from: string;
  to: string;
}

export interface RequestHistoryAction {
  data: RequestHistoryParams;
  type: string;
  meta?: MetaData;
}

export interface RequestHistoryActionSuccess {
  data: QuoteHistoryData;
  type: string;
}

export interface RequestGainsParams {
  stockName: string;
  purchasedAmount: number;
  purchasedAt: string;
}

export interface RequestGainsAction {
  data: RequestGainsParams;
  type: string;
  meta?: MetaData;
}

export interface RequestGainsActionSuccess {
  data: ProjectionData;
  type: string;
}

export interface RequestCompareParams {
  stockName: string;
  data: ComparePayload;
}

export interface RequestCompareAction {
  data: RequestCompareParams;
  type: string;
  meta?: MetaData;
}

export interface RequestCompareActionSuccess {
  data: CompareData;
  type: string;
}

export interface AddPortfolioAction {
  data: QuoteData;
  type: string;
}

export interface ClearCompareAction {
  type: string;
}

export interface RemovePortfolioAction {
  data: QuoteData;
  type: string;
}
