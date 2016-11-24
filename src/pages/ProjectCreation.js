import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {SubmissionError} from 'redux-form'
import styles from './ProjectCreation.css'
import ProjectCreationForm from '../components/ProjectCreationForm'
import github from 'octonode'
import {remote, ipcRenderer} from 'electron'
import Promise from 'bluebird'
import db from '../db'
import Repository from '../models/Repository'

const propTypes = {
  client: PropTypes.object
}

class ProjectCreation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      repo: null,
      destDir: null
    }
  }

  onSubmit(values) {
    const {token} = this.props
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('create-repo-end', (event, arg) => {

        const repoObject = new Repository("123123", "a", "b", "C", "d")
        repoObject.save()
        Repository
          .get("123123")
          .then(repo => {
            console.log(repo)
          })
        if (arg.success) {
          resolve(arg)
        } else {
          reject(new SubmissionError(arg))
        }
      })
    })

    ipcRenderer.send('create-repo-start', {token, values})

    return promise.then((arg => {
      this.setState({destDir: arg.destDir})
    })).catch((err) => {
      throw err
    })
  }

  render() {
    return (
      <div id={styles.creationBackground}>
        <div className="middleOuter">
          <div className="middle">
            <ProjectCreationForm
              onSubmit={this
              .onSubmit
              .bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

ProjectCreation.propTypes = propTypes

function select(state) {
  return {token: state.login.token}
}

export default connect(select)(ProjectCreation)
