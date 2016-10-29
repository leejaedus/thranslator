import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const Login = require('./pages/LoginPage').default;
ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>
  , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./pages/LoginPage', () => {
    const NextLogin = require('./pages/LoginPage').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextLogin />
      </Provider>
      , document.getElementById('root')
    );
  });
}
