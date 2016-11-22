import { ipcMain, app, BrowserWindow } from 'electron'
import github from 'octonode'
import Git from 'simple-git'
import fs from 'fs-extra'
import uuid from 'uuid'
import Promise from 'bluebird'

function success(args: Object): Object {
  return {
    ...args,
    success: true,
  }
}

function fail(args: Object): Object {
  return {
    ...args,
    success: false,
  }
}

ipcMain.on('create-repo-start', (event, arg) => {
  const {token, values} = arg
  const regexp = /[a-z0-9\-]*/gi
  const params = {
    name: values.name,
    description: values.name,
  }

  if (values.name !== values.name.match(regexp)[0]) {
    return event.sender.send('create-repo-end', fail({
      name: '올바르지 않은 형식의 이름입니다. 알파벳 및 `-` 만 사용이 가능합니다.',
    }))
  }

  const me = github.client(token).me()
  const createRepo = Promise.promisify(me.createRepo.bind(me))

  createRepo(params)
    .then((res) => {
      const {ssh_url} = res
      if (ssh_url) {
        const git = Git()
        const baseDir = app.getPath('userData')
        const destDir = `${baseDir}/repos/${uuid.v4()}`
        git.clone(ssh_url, destDir)

        event.sender.send('create-repo-end', success({
          destDir,
        }))
      }
    })
    .catch((e) => {
      event.sender.send('create-repo-end', fail({
        name: '중복되는 이름이거나, 사용할 수 없는 이름입니다.'
      }))
    })
})
