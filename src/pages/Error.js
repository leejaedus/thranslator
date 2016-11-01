import React from 'react';
import { connect } from 'react-redux';

class Error extends React.Component {
  render() {
    return (
      <div>Not Found</div>
    )
  }
}

export default connect()(Error);
