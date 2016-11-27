// @flow
import * as LoginActions from '../actions/LoginActions';

const initialState = {
  token: '',
};

export default function login(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case LoginActions.LOGIN:
      return {
        token: action.token,
      };
    default:
      return state;
  }
}
