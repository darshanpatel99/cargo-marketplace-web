import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import './App.css'


import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import HomePage from "views/Home/Home.js";
import ProductPage from "views/Product/ProductDetail.js";

import Root from './Root'
import Tawk from './tawk'
ReactDOM.render(<Root />, document.getElementById("root"));

