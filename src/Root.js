import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


// All the following keys are optional, as default values are provided.
const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFA105' }, // Purple and green play nicely together.
    secondary: { main: '#FFA105' }, // This is just green.A700 as hex.
  },
});

const store = configureStore();

function Root() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
   
  );
}

export default Root;