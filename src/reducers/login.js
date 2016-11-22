// @flow
import * as LoginActions from '../actions/LoginActions';

const initialState = {
  token: window.localStorage.getItem('githubtoken') || '',
};

export default function login(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case LoginActions.LOGIN:
      window.localStorage.setItem('githubtoken', action.token);
      return {
        token: action.token,
      };
    default:
      return state;
  }
}
