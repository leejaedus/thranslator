import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import IndexPage from './pages/IndexPage';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import { Provider } from 'react-redux';
import React from 'react';

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="/index"/>
      </Route>
      <Route path="/index" component={IndexPage}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="*" component={ErrorPage}/>
    </Router>
  </Provider>
);
