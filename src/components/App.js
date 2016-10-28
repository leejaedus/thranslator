/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../action';

class App extends React.Component {
  render() {
    let { dispatch, text } = this.props;

    return (
      <div>
        <h1>Text : <span>{text}</span></h1>
        <button onClick={() => dispatch(Actions.defaultAction("TypeA"))}>TypeA</button>
        <button onClick={() => dispatch(Actions.defaultAction("TypeB"))}>TypeB</button>
        <button onClick={() => dispatch(Actions.defaultAction("TypeC"))}>TypeC</button>
      </div>
    );
  }
}
App.propTypes = {
  text: PropTypes.string.isRequired,
};
function select(state) {
  return {
    text: state.text,
  };
}
export default connect(select)(App);
