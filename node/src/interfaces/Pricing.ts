interface Pricing {
  opening: number;
  low: number;
  high: number;
  closing: number;
  priceAt: string;
}

export default interface History {
  name: string;
  prices: Array<Pricing>;
}
