// format as key attribution
type IntraDayData = {
  [key in string]: TimesSeries;
};

type TimesSeries = {
  [key in MetaDataAttribution]: string;
};

type MetaDataAttribution =
  | '1. open'
  | '2. high'
  | '3. low'
  | '4. close'
  | '5. adjusted close'
  | '6. volume'
  | '7. dividend amount'
  | '8. split coefficient';

type DateFormat = {
  open: string;
  high: string;
  low: string;
  close: string;
  adjustedClose: string;
  volume: string;
  dividendAmount: string;
  splitCoefficient: string;
};

async function comparHistoricActions(
  timesSeries: IntraDayData,
  intervalDates: string[],
): Promise<TimesSeries[]> {
  let newTimeSeries: TimesSeries = {};

  const listNewTimeSeries: TimesSeries[] = [];

  intervalDates.forEach(async date => {
    Object.keys(timesSeries).forEach(async (item, index) => {
      if (item === date) {
        const formattedDate = Object.assign(Object.values(timesSeries)[index], {
          date,
        });

        listNewTimeSeries.push(formattedDate);
      }
    });
  });
  // console.log(listNewTimeSeries);

  return listNewTimeSeries;
}

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

export { formattedData, comparHistoricActions };
