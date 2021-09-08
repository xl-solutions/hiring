import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Main } from "../pages/main";
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
