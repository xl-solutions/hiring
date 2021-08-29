import React from 'react';
import renderer from 'react-test-renderer';
import EarningsProjection from '../src/components/EarningsProjection';
import Dashboard from '../src/pages/Dashboard';

it('renders correctly', () => {
  const tree = renderer.create(<EarningsProjection />).toJSON();
  expect(tree).toMatchSnapshot();
});
