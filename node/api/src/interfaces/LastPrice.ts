interface LastPrice {
  name: string;
  lastPrice: number;
  pricedAt: string;
}

export default interface LastPrices {
  lastPrices: Array<LastPrice>;
}
