import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import HomePage from "views/Home/Home.js";
import ProductPage from "views/Product/ProductDetail.js";
import CheckoutPage from "views/Checkout/Checkout.js";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/product" component={ProductPage} />
      <Route path="/checkout" component={CheckoutPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
