const getKeyForObject = (responseRequest, keyName = 'Time Series') =>
  Object.keys(responseRequest).filter((key, index) => {
    if (key.includes(keyName)) return key;
  })[0];

module.exports = getKeyForObject;
