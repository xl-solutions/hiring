export type EndpointsResponseTypes = GetStockBySymbol | CompareStockBySymbols;

export type GetStockBySymbol = {
  name: string;
  lastPrice: number;
  pricedAt: string; // data e hora no formato ISO 8601, UTC
};

export type CompareStockBySymbols = {
  lastPrices: GetStockBySymbol[];
};
