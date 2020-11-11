import React from 'react';
import ShowLastPrice from '../../components/Home/ShowLastPrice/ShowLastPrice';
import ShowHistoricalPrice from '../../components/Home/ShowHistoricalPrice/ShowHistoricalPrice';
import ShowCompareStocks from '../../components/Home/ShowCompareStocks/ShowCompareStocks';
import ShowEarningsProjection from '../../components/Home/ShowEarningsProjection/ShowEarningsProjection';
import { Switch, Route } from 'react-router-dom';

const HomeRoutes = () => {
  return (
    <Switch>
      <Route path="/home/show-last-price">
        <ShowLastPrice />
      </Route>
      <Route path="/home/show-historical-price">
        <ShowHistoricalPrice />
      </Route>
      <Route path="/home/show-compare-stocks">
        <ShowCompareStocks />
      </Route>
      <Route path="/home/show-earnings-projection">
        <ShowEarningsProjection />
      </Route>
    </Switch>
  );
};

export default HomeRoutes;
