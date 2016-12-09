import { remote } from 'electron'
import React, { PropTypes } from 'react'
import styles from './Login.css'
import request from '../request'
import { history } from '../router'
import db from '../db'

class Login extends React.Component {
  loginWithGitHub() {
    // Your GitHub applications Credentials
    const options = {
      client_id: 'dce139e84f0222db7a45',
      client_secret: '510ef36458902f1dcbb133a60c6f744168dd15cf',
      scopes: ['user', 'repo', 'gist', 'notifications']
    }

    // Build the OAuth consent page URL
    let authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: false,
      'node-integration': false,
    })
    const githubUrl = 'https://github.com/login/oauth/authorize?'
    const authUrl = `${githubUrl}client_id=${options.client_id}&scope=${options.scopes.toString()}`
    authWindow.loadURL(authUrl)
    authWindow.show()

    const requestGitHubToken = (options, code) => {
      request
        .post('https://github.com/login/oauth/access_token', {
          client_id: options.client_id,
          client_secret: options.client_secret,
          code: code
        })
        .then((json) => {
          const token = json.data.access_token
          window.localStorage.token = token
          db
            .setItem('githubToken', token)
            .then(() => {
              window.token = token
              history.push('/')
            })
        })
    }

    const handleCallback = (url) => {
      const raw_code = /code=([^&]*)/.exec(url) || null
      const code = (raw_code && raw_code.length > 1) ?
        raw_code[1] :
        null
      const error = /\?error=(.+)$/.exec(url)

      if ((code || error) && authWindow != null) {
        authWindow.destroy()
      }

      if (code) {
        requestGitHubToken(options, code)
      } else if (error) {
        alert('Oops! Something went wrong and we couldn\'t log you in using Github. Please try again.')
      }
    }

    authWindow
      .webContents
      .on('will-navigate', (event, url) => {
        handleCallback(url)
      })

    authWindow
      .webContents
      .on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        handleCallback(newUrl)
      })

    // Reset the authWindow on close
    authWindow.on('close', () => {
      authWindow = null
    }, false)
  }

  render() {
    return (
      <div id={ styles.loginBackground }>
        <div className="middleOuter">
          <div className="middle">
            <div id={ styles.loginFrame }>
              <h2>사용자 로그인</h2>
              <br/>
              <br/>
              <br/>
              <button className="btn btn-block btn-social btn-github" onClick={ () => this.loginWithGitHub() }>
                <span className="fa fa-github"></span> Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
