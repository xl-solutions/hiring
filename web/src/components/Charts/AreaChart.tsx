import Chart from 'react-apexcharts';
import ptBr from 'apexcharts/dist/locales/pt-br.json';

interface AreaChartProps {
  name: string;
  categories: string[];
  data: number[];
}

export function AreaChart({ name, categories, data }: AreaChartProps) {
  const series = [{ name: `${name}`, data }];

  const options = {
    chart: {
      locales: [ptBr],
      defaultLocale: 'pt-br',
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
      enabled: true,
    },
    xaxis: {
      type: 'datetime' as const,
      axisBorder: {
        color: '#fff',
      },
      axisTicks: {
        color: '#fff',
      },
      categories,
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

  return <Chart options={options} series={series} type="area" height={340} />;
}
