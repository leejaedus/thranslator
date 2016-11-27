import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import Login from './pages/Login'
import Error from './pages/Error'
import Index from './pages/Index'
import ProjectCreation from './pages/ProjectCreation'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import { Provider } from 'react-redux'
import React from 'react'
import db from '../src/db'

export const history = syncHistoryWithStore(browserHistory, store)

function loginRequired(nextState, replace, callback) {
  return db
    .getItem('githubToken')
    .then(token => {
      if (token === null || token === undefined) {
        replace({
          pathname: '/login',
          state: {
            nextPathname: nextState.location.pathname
          }
        })
      }
      callback()
    })
}

export default () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/">
        <IndexRedirect to="/index" />
        <Route path="index" component={ Index } onEnter={ loginRequired } />
        <Route path="login" component={ Login } />
        <Route path="projects">
          <Route path="create" component={ ProjectCreation } />
        </Route>
      </Route>
      <Route path="*" component={ Error } />
    </Router>
  </Provider>
)
