import React from 'react';
import { connect } from 'react-redux';

class IndexPage extends React.Component {
  render() {
    return (
      <div> THIS IS INDEX</div>
    )
  }
}

export default connect()(IndexPage);
