/* @flow */
import * as Actions from './action';

export default function (state , action: Object) {
  switch (action.type) {
    case Actions.DEFAULT_ACTION:
      return {...state, text: action.text};
    default:
      return state;
  }
}
