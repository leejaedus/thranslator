/* @flow */
import { createStore, combineReducers } from 'redux';
import defaultReducer from './reducer';
import { routerReducer } from 'react-router-redux';

let reducer = combineReducers({
  'default': defaultReducer,
  routing: routerReducer,
});
export default createStore(reducer);
