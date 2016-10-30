import React from 'react';
import { connect } from 'react-redux';

class ErrorPage extends React.Component {
  render() {
    return (
      <div>Not Found</div>
    )
  }
}

export default connect()(ErrorPage);
