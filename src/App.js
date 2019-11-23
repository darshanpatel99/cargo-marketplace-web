import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";



import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import HomePage from "views/Home/Home.js";
import ProductPage from "views/Product/ProductDetail.js";
import SignIn from 'views/Authentication/SignIn.js';
import Signup from 'views/Authentication/Signup.js';
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './views/Checkout/Checkout'



function App(props) {
const { isAuthenticated, isVerifying } = props;

  return (


      <Switch>
      <Route
          exact
          path="/"
          component={HomePage}
        />
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/product" component={ProductPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/checkout" component= {Checkout} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
      </Switch>
  );
}

function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isVerifying: state.auth.isVerifying
    };
  }

  export default connect(mapStateToProps)(App);
