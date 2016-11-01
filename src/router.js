import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import Login from './pages/Login';
import Error from './pages/Error';
import Index from './pages/Index';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import { Provider } from 'react-redux';
import React from 'react';

export const history = syncHistoryWithStore(browserHistory, store);

function loginRequired(nextState, replace) {
  const token = window.localStorage.getItem('githubtoken');
  if (token) {
    return;
  }

  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
}

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="/index"/>
        <Route path="index" component={Index} onEnter={loginRequired}/>
        <Route path="login" component={Login}/>
      </Route>
      <Route path="*" component={Error}/>
    </Router>
  </Provider>
);
