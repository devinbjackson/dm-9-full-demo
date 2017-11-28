import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from "./store";
import "./index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

injectTapEventPlugin();

ReactDOM.render(
  
  <Provider store={store}>
    <BrowserRouter>
    <MuiThemeProvider>
      <ScrollToTop>
      <App />
      </ScrollToTop>
    </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
