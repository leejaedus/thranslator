/* @flow */
import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {
  'text': 'DEFAULT',
};
export default createStore(reducer, initialState);
