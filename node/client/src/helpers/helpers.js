export const toUSD = (value) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
