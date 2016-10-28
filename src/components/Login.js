/* @flow */
import { connect } from 'react-redux';
import request from '../request';
import { remote } from 'electron';
import React, { PropTypes } from 'react';
import styles from './Login.css';

class Login extends React.Component {
  loginWithGitHub() {
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

    const requestGithubToken = (options, code) => {
      request
        .post('https://github.com/login/oauth/access_token', {
          client_id: options.client_id,
          client_secret: options.client_secret,
          code: code,
        })
        .then((json) => window.localStorage.setItem('githubtoken', json.data.access_token));
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
        requestGithubToken(options, code);
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
              {/*<button onClick={() => dispatch(Actions.defaultAction("Thranslator"))}>TypeA</button>*/}
              {/*<button onClick={() => dispatch(Actions.defaultAction("TypeB"))}>TypeB</button>*/}
              {/*<button onClick={() => dispatch(Actions.defaultAction("TypeC"))}>TypeC</button>*/}

              <button
                className="btn btn-block btn-social btn-github"
                onClick={this.loginWithGitHub}
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
Login.propTypes = {
  text: PropTypes.string.isRequired,
};
function select(state) {
  return {
    text: state.text,
  };
}
export default connect(select)(Login);
