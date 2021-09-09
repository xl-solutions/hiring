import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Stocks } from "../pages/main/stocks";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Stocks />} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};
