import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from '../src/pages/main/index'

  
const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
  
  export default Routes;
