// format as key attribution
function formattedData(params: []) {
  const newDataFormat = params.map(item => {
    let attribution = {};

    Object.keys(item).forEach((key, index) => {
      const [, keyFormatted] = key.split(' ');
      Object.assign(attribution, {
        [keyFormatted]: Object.values(item)[index],
      });
      console.log(attribution);
    });

    return attribution;
  });

  return newDataFormat;
}

export { formattedData };
