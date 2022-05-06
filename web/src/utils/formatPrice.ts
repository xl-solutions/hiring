export const { format: formatPriceBRL } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export const { format: formatPriceUSD } = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
});
