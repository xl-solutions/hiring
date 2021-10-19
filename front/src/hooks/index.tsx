import React from 'react';
import { ChartProvider } from './chart';

import { StocksProvider } from './stocks';

const AppProvider: React.FC = ({ children }) => (
  <ChartProvider>
    <StocksProvider>{children}</StocksProvider>
  </ChartProvider>
);

export default AppProvider;
