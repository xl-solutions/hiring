import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "./pages/main";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};
