export const transformSymbolSearch = (data = {}) => {
  return Array.isArray(data)
    ? data.map(element => {
        return {
          symbol: element['1. symbol'],
          name: element['2. name'],
          type: element['3. type'],
          region: element['4. region'],
          currency: element['8. currency'],
        };
      })
    : {
        symbol: data['1. symbol'],
        name: data['2. name'],
        type: data['3. type'],
        region: data['4. region'],
        currency: data['8. currency'],
      };
};

export const transformGlobalQuote = (data = {}) => {
  return {
    symbol: data['01. symbol'],
    open: data['02. open'],
    high: data['03. high'],
    low: data['04. low'],
    price: data['05. price'],
    volume: data['06. volume'],
    latestTradingDay: data['07. latest trading day'],
    previousClose: data['08. previous close'],
    change: data['09. change'],
    changePercent: data['10. change percent'],
  };
};

export const transformSeries = (data = {}) => {
  let transformedData = Object.keys(data).map(element => {
    return {
      date: element,
      open: data[element]['1. open'],
      high: data[element]['2. high'],
      low: data[element]['3. low'],
      close: data[element]['4. close'],
      volume: data[element]['5. volume'],
    };
  });
  return transformedData;
};

export const transformDailyAdjustedSeries = (data = {}) => {
  let transformedData = Object.keys(data).map(element => {
    return {
      date: element,
      open: data[element]['1. open'],
      high: data[element]['2. high'],
      low: data[element]['3. low'],
      close: data[element]['4. close'],
      volume: data[element]['6. volume'],
    };
  });
  return transformedData;
};
