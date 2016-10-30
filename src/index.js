import ReactDOM from 'react-dom';
import React from 'react';

const Router = require('./router').default;
ReactDOM.render(
  <Router />
  , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./router', () => {
    const NextRouter = require('./router').default;
    ReactDOM.render(
      <NextRouter />
      , document.getElementById('root')
    );
  });
}
