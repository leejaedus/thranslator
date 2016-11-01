/* @flow */
import * as LoginActions from '../actions/LoginActions';
import github from 'octonode';

const initialState = {
  token: window.localStorage.getItem('githubtoken') || '',
  client: window.localStorage.getItem('githubtoken') ?
    github.client(window.localStorage.getItem('githubtoken')) : null,
};

export default function login(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case LoginActions.LOGIN:
      window.localStorage.setItem('githubtoken', action.token);
      return {
        token: action.token,
        client: github.client(action.token),
      };
    default:
      return state;
  }
}
