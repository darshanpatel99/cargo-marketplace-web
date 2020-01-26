import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";



import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import HomePage from "views/Home/Home.js";
import ProductPage from "views/Product/ProductDetail.js";
import SignIn from 'views/Authentication/SignIn.js';
import Signup from 'views/Authentication/Signup.js';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './views/Checkout/Checkout';
import Post from './views/PostProduct/PostProductMain.js';
import Paypal from './views/Checkout/Paypal';
import ThankYou from './views/Checkout/ThankYou';
import About from './views/Pages/About';
import NotFound from './views/Pages/NotFound'

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
        <Route path="/product/:productId" component={ProductPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={Signup} />
        <Route path="/Post" component={Post} />
        <Route path="/Paypal" component={Paypal} />
        <Route path="/thankyou" component={ThankYou} />
        <Route path="/about" component={About} />

        <ProtectedRoute path="/checkout" component= {Checkout} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
        <Route path="*" component={NotFound} />
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
