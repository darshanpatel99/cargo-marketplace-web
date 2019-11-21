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



function App(props) {
const { isAuthenticated, isVerifying } = props;

  return (


      <Switch>
      <ProtectedRoute
          exact
          path="/"
          component={HomePage}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/product" component={ProductPage} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={Signup} />
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
