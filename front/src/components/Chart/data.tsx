import { ApexOptions } from 'apexcharts';

export const options = (): ApexOptions => ({
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
    toolbar: { show: false },
  },
  dataLabels: {
    enabled: false,
  },
  series: [],
  stroke: {
    width: [4, 4],
  },
  plotOptions: {
    bar: {
      columnWidth: '20%',
    },
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: [
    {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#FF1654',
      },
      labels: {
        style: {
          colors: '#FF1654',
        },
      },
      title: {
        text: 'Preço',
        style: {
          color: '#FF1654',
        },
      },
    },
  ],
  tooltip: {
    shared: false,
    intersect: true,
    x: {
      show: false,
    },
  },
  legend: {
    horizontalAlign: 'left',
    offsetX: 40,
  },
});
