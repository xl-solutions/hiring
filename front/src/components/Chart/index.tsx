import React from 'react';
import ApexCharts from 'react-apexcharts';
import { useChart } from '../../hooks/chart';
import { options } from './data';
import { Container } from './styles';

const Chart = (): React.ReactElement => {
  const { series } = useChart();
  return (
    <Container>
      <ApexCharts
        className="apex-charts"
        height={220}
        options={options()}
        series={series}
      />
    </Container>
  );
};
export { Chart };
