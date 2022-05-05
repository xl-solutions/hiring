import Chart from 'react-apexcharts';

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: '#fff',
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime' as const,
    axisBorder: {
      color: '#fff',
    },
    axisTicks: {
      color: '#fff',
    },
    categories: [
      '2022-04-20T00:00:00.000Z',
      '2022-04-21T00:00:00.000Z',
      '2022-04-22T00:00:00.000Z',
      '2022-04-23T00:00:00.000Z',
      '2022-04-24T00:00:00.000Z',
      '2022-04-25T00:00:00.000Z',
      '2022-04-26T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  tooltip: {
    enabled: false,
  },
};

const series = [{ name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }];

export function AreaChart() {
  return <Chart options={options} series={series} type="area" height={340} />;
}
