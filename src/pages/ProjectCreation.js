import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import styles from './ProjectCreation.css';
import ProjectCreationForm from '../components/ProjectCreationForm';
import github from 'octonode';
import { remote, ipcRenderer } from 'electron';


const propTypes = {
  client: PropTypes.object,
};

class ProjectCreation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repo: null,
      destDit: null,
    }
  }

  onSubmit(values) {
    const {client, token} = this.props;

    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('create-repo-end', (event, arg) => {
        if (arg.success) {
          resolve(arg.destDir)
        } else {
          reject(new SubmissionError({
            name: '사용할 수 없는 이름입니다.'
          }))
        }
      });

      ipcRenderer.send('create-repo-start', {
        token,
        values,
      });
    });

    return promise
      .then(destDir => {
        this.setState({
          destDir
        })
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <div id={ styles.creationBackground }>
        <div className="middleOuter">
          <div className="middle">
            <ProjectCreationForm onSubmit={ this.onSubmit.bind(this) } />
          </div>
        </div>
      </div>
    )
  }
}

ProjectCreation.propTypes = propTypes;

function select(state) {
  return {
    client: state.login.client,
    token: state.login.token,
  }
}

export default connect(select)(ProjectCreation);
