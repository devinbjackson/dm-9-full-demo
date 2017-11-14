import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import MenPage from "./components/MenPage/MenPage";
import WomenPage from "./components/WomenPage/WomenPage";
import AccPage from "./components/AccPage/AccPage";
import Details from "./components/Details/Details";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={Login} />
    <Route path="/men" component={MenPage} />
    <Route path="/women" component={WomenPage} />
    <Route path="/accessories" component={AccPage} />
    <Route path="/details/:id" component={Details} />
  </Switch>
);
