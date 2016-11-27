import {ipcMain, app, BrowserWindow} from 'electron'
import github from 'octonode'
import Git from 'simple-git'
import fs from 'fs-extra'
import UUID from 'uuid'
import Promise from 'bluebird'
import Repository from '../src/models/Repository'

function success(args : Object) : Object {
  return {
    ...args,
    success: true
  }
}

function fail(args : Object) : Object {
  return {
    ...args,
    success: false
  }
}

ipcMain.on('create-repo-start', (event, arg) => {
  const {token, values} = arg
  const regexp = /[a-z0-9\- ]*/gi
  const params = {
    name: values.name,
    description: values.name
  }

  if (values.name !== values.name.match(regexp)[0]) {
    return event
      .sender
      .send('create-repo-end', fail({name: '올바르지 않은 형식의 이름입니다. 알파벳 및 `-` 만 사용이 가능합니다.'}))
  }

  const me = github
    .client(token)
    .me()
  const createRepo = Promise.promisify(me.createRepo.bind(me))
  params.name = params
    .name
    .replace(/ /i, '-')

  createRepo(params).then((res) => {
    const {ssh_url: sshUrl, full_name: fullName, name, description} = res
    if (sshUrl) {
      const git = Git()
      const uuid = UUID.v4()
      const baseDir = app.getPath('userData')
      const destDir = `${baseDir}/repos/${uuid}`
      git.clone(sshUrl, destDir)
      event
        .sender
        .send('create-repo-end', success({uuid, name, fullName, description, sshUrl, destDir}))
    }
  }).catch((e) => {
    console.log(e)
    event
      .sender
      .send('create-repo-end', fail({name: '중복되는 이름이거나, 사용할 수 없는 이름입니다.'}))
  })
})
