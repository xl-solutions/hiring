import Chart from 'react-apexcharts';
import ptBr from 'apexcharts/dist/locales/pt-br.json';

interface BarChartProps {
  name: string;
  categories?: string[];
  data: number[];
  horizontal?: boolean;
}

export function BarChart({
  name,
  categories,
  data,
  horizontal,
}: BarChartProps) {
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
    plotOptions: {
      bar: {
        horizontal,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      type: 'category' as const,
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
        opacityFrom: 0.8,
        opacityTo: 0.6,
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  return <Chart options={options} series={series} type="bar" height={340} />;
}
