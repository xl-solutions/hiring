import React from 'react';
import renderer from 'react-test-renderer';
import EarningsProjection from '../src/components/EarningsProjection';
import HistoricPriceDailySeries from '../src/components/HistoricPriceDailySeries';
import ModalStockSeriesDetails from '../src/components/ModalStockSeriesDetails';
import Dashboard from '../src/pages/Dashboard';

it('renders dashboard correctly', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders EarningsProjection correctly', () => {
  const tree = renderer
    .create(<EarningsProjection visible={true} symbol={'IBM'} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders HistoricPriceDailySeries correctly', () => {
  const tree = renderer
    .create(<HistoricPriceDailySeries visible={true} symbol={'IBM'} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ModalStockSeriesDetails daily correctly', () => {
  const tree = renderer
    .create(
      <ModalStockSeriesDetails visible={true} stock={'IBM'} mode={'daily'} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ModalStockSeriesDetails intraday correctly', () => {
  const tree = renderer
    .create(
      <ModalStockSeriesDetails
        visible={true}
        stock={'IBM'}
        mode={'intraday'}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
