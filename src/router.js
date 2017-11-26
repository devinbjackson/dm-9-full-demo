import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import MenPage from "./components/MenPage/MenPage";
import WomenPage from "./components/WomenPage/WomenPage";
import AccPage from "./components/AccPage/AccPage";
import Details from "./components/Details/Details";
import CheckoutView from "./components/CheckoutView/CheckoutView";

export default (
  <Switch>
    <Route path="/"    exact   component={LandingPage} />
    <Route path="/men"         component={MenPage} />
    <Route path="/women"       component={WomenPage} />
    <Route path="/accessories" component={AccPage} />
    <Route path="/details/:id" component={Details} />
    <Route path="/checkout"    component={CheckoutView}/> 
  </Switch>
);
