import { AxiosResponse } from 'axios';

import api from 'services/api';

import {
  QuoteData,
  CompareData,
  ProjectionData,
  QuoteHistoryData,
} from 'interfaces';
import {
  RequestGainsParams,
  RequestCompareParams,
  RequestHistoryParams,
} from 'interfaces/actions/stocks';

const get = (
  stockName: string
): Promise<AxiosResponse<{ data: QuoteData }>> => {
  return api.get(`stocks/${stockName}/quote`);
};

const history = ({
  stockName,
  from,
  to,
}: RequestHistoryParams): Promise<
  AxiosResponse<{ data: QuoteHistoryData }>
> => {
  return api.get(`stocks/${stockName}/history?from=${from}&to=${to}`);
};

const compare = ({
  stockName,
  data,
}: RequestCompareParams): Promise<AxiosResponse<{ data: CompareData }>> => {
  return api.post(`stocks/${stockName}/compare`, data);
};

const gains = ({
  stockName,
  purchasedAmount,
  purchasedAt,
}: RequestGainsParams): Promise<AxiosResponse<{ data: ProjectionData }>> => {
  return api.get(
    `stocks/${stockName}/gains?purchasedAmount=${purchasedAmount}&purchasedAt=${purchasedAt}`
  );
};

export { get, history, compare, gains };
