/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  client: PropTypes.object,
};

class ProjectCreation extends React.Component {
  render() {
    return (
      <div>ProjectCreation Page</div>
    )
  }
}

ProjectCreation.propTypes = propTypes;

function select(state) {
  return {
    client: state.login.client,
  }
}

export default connect(select)(ProjectCreation);
