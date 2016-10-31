/* @flow */
import { connect } from 'react-redux';
import { remote } from 'electron';
import React, { PropTypes } from 'react';
import styles from './LoginPage.css';
import request from '../request';
import * as LoginActions from '../actions/LoginActions';
import { history } from '../router';

class LoginPage extends React.Component {
  loginWithGitHub() {
    const { dispatch } = this.props;

    // Your GitHub applications Credentials
    const options = {
      client_id: 'dce139e84f0222db7a45',
      client_secret: 'dbbdac3db0976c2f9b73838d0863c256bc271a1a',
      scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
    };

    // Build the OAuth consent page URL
    let authWindow = new remote.BrowserWindow({ width: 500, height: 600, show: false, 'node-integration': false });
    const githubUrl = 'https://github.com/login/oauth/authorize?';
    const authUrl = `${githubUrl}client_id=${options.client_id}&scope=${options.scopes.toString()}`;
    authWindow.loadURL(authUrl);
    authWindow.show();

    const requestGitHubToken = (options, code) => {
      request
        .post('https://github.com/login/oauth/access_token', {
          client_id: options.client_id,
          client_secret: options.client_secret,
          code: code,
        })
        .then((json) => {
          dispatch(LoginActions.login(json.data.access_token));
          history.push('/index');
        });
    };

    const handleCallback = (url) => {
      const raw_code = /code=([^&]*)/.exec(url) || null;
      const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
      const error = /\?error=(.+)$/.exec(url);

      if ((code || error) && authWindow != null) {
        // Close the browser if code found or error
        authWindow.destroy();
      }

      // If there is a code, proceed to get token from github
      if (code) {
        requestGitHubToken(options, code);
      } else if (error) {
        alert('Oops! Something went wrong and we couldn\'t log you in using Github. Please try again.');
      }
    };

    // Handle the response from GitHub - See Update from 4/12/2015

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleCallback(url);
    });

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleCallback(newUrl);
    });

    // Reset the authWindow on close
    authWindow.on('close', () => {
      authWindow = null;
    }, false);
  }

  render() {
    return (
      <div id={styles.loginBackground}>
        <div className="middleOuter">
          <div className="middle">
            <div id={styles.loginFrame}>
              <h2>사용자 로그인</h2>
              <br/>
              <br/>
              <br/>
              <button
                className="btn btn-block btn-social btn-github"
                onClick={() => this.loginWithGitHub()}
              >
                <span className="fa fa-github"></span> Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  token: PropTypes.string.isRequired,
};
LoginPage.defaultProps = {};

function select(state) {
  return {
    token: state.login.token,
  };
}
export default connect(select)(LoginPage);
