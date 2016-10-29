/* @flow */
import { createStore, combineReducers } from 'redux';
import defaultReducer from './reducer';
import { routerReducer } from 'react-router-redux';

const initialState = {
  'defaultReducer': {
    'text': 'DEFAULT',
  },
};
let reducer = combineReducers({
  defaultReducer,
  routing: routerReducer,
});
export default createStore(reducer, initialState);
