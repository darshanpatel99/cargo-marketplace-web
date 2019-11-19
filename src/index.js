import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import HomePage from "views/Home/Home.js";
import ProductPage from "views/Product/ProductDetail.js";
import CheckoutPage from "views/Checkout/Checkout.js";
import SignIn from 'views/Authentication/SignIn.js';
import Signup from 'views/Authentication/Signup.js';
import PostProduct from 'views/PostProduct/PostProductMain.js';

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/product" component={ProductPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={Signup} />
      <Route path="/Post" component={PostProduct} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
