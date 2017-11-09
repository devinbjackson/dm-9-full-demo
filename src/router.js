import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={Login} />
  </Switch>
);
