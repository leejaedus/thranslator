import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import styles from './ProjectCreation.css'
import ProjectCreationForm from '../components/ProjectCreationForm'
import { remote, ipcRenderer } from 'electron'
import Repository from '../models/Repository'

const propTypes = {
  client: PropTypes.object
}

class ProjectCreation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      repo: null
    }
  }

  onSubmit(values) {
    const token = window.localStorage.token
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('create-repo-end', (event, arg) => {

        if (arg.success) {
          resolve(arg)
        } else {
          reject(arg)
        }
      })
    })

    ipcRenderer.send('create-repo-start', { token, values })

    return promise
      .then(rawRepo => {
        const repo = Repository.fromObject(rawRepo)
        return repo.save()
      })
      .then(repo => {
        this.setState({ repo })
        console.log('Done!')
      })
      .catch(err => {
        throw new SubmissionError(err)
      })
  }

  render() {
    return (
      <div id={styles.creationBackground}>
        <div className="middleOuter">
          <div className="middle">
            <ProjectCreationForm onSubmit={this.onSubmit.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

ProjectCreation.propTypes = propTypes

export default connect()(ProjectCreation)
