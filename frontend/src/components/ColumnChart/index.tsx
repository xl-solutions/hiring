/* eslint-disable no-unused-expressions */
import React from 'react';
import Chartkick, { ColumnChart as Chart } from 'react-chartkick';

import 'chart.js';

interface ChartProps {
  data: any[];
}

const ColumnChart: React.FC<ChartProps> = ({ data }) => {
  const [chartSize, setCharSize] = React.useState('600px');

  const handleSizeChange = React.useCallback(() => {
    window.innerWidth >= 768 ? setCharSize('600px') : setCharSize('100%');
  }, []);

  React.useEffect(() => {
    Chartkick.configure({ language: 'pt' });
  }, []);

  React.useEffect(() => {
    handleSizeChange();
    window.addEventListener('resize', handleSizeChange);
    return () => window.removeEventListener('resize', handleSizeChange);
  }, [handleSizeChange]);

  return <Chart width={chartSize} data={data} colors={['#007eff']} />;
};

export default ColumnChart;
