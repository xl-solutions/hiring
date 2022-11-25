export type EndpointsResponseTypes = GetStockBySymbol | CompareStockBySymbols | GetStockHistoryBySymbol;

export type GetStockBySymbol = {
  name: string;
  lastPrice: number;
  pricedAt: string; // data e hora no formato ISO 8601, UTC
};

export type CompareStockBySymbols = {
  lastPrices: GetStockBySymbol[];
};

export interface HistoricPrices {
  opening: number;
  low: number;
  high: number;
  closing: number;
  pricedAt: string; // data no formato ISO 8601, UTC
}

export interface GetStockHistoryBySymbol {
  name: string;
  prices: HistoricPrices[];
}
