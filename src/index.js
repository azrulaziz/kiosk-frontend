import React from 'react';
import { render } from 'react-dom'
import App from './App';
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { BrowserRouter } from 'react-router-dom'

const store = configureStore();

render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
  