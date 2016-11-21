// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import login from './login';

const rootReducer = combineReducers({
  login,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
