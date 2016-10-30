import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import IndexPage from './pages/IndexPage';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import { Provider } from 'react-redux';
import React from 'react';

const history = syncHistoryWithStore(browserHistory, store);

function loginRequired(nextState, replace) {

  console.log(nextState);
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
        <Route path="index" component={IndexPage} onEnter={loginRequired}/>
        <Route path="login" component={LoginPage}/>
      </Route>
      <Route path="*" component={ErrorPage}/>
    </Router>
  </Provider>
);
