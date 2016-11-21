import { ipcMain, app, BrowserWindow } from 'electron'
import github from 'octonode';
import Git from 'simple-git';
import fs from 'fs-extra';
import uuid from 'uuid';

ipcMain.on('create-repo-start', (event, arg) => {
  const git = Git();
  const {token, values} = arg;
  const promise = new Promise(
    (resolve, reject) => {
      github.client(token)
        .me()
        .repo({
          'name': values.name,
          'description': values.description,
        }, (err, repo, body) => {
          if (repo !== null) {
            return resolve(repo);
          } else if (err !== null) {
            return reject(err);
          }
        })
    })
    .then((repo) => {
      const baseDir = app.getPath('userData')
      const destDir = `${baseDir}/repos/${uuid.v4()}`
      git.clone(repo.ssh_url, destDir)
      event.sender.send('create-repo-end', {
        destDir,
        success: true,
      })
    })
    .catch(() => {
      event.sender.send('create-repo-end', {
        success: false
      })
    })
});
