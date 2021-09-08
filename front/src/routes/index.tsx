import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Main } from "../pages/main";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};
