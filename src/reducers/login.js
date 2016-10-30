/* @flow */
import * as LoginActions from '../actions/LoginActions';

const initialState = {
  token: window.localStorage.getItem('githubtoken') || '',
};

export default function player(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case LoginActions.LOGIN:
      window.localStorage.setItem('githubtoken', token);
      return state;
    default:
      return state;
  }
}
