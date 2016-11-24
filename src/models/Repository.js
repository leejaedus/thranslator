import db from '../db'

export default class Repository {

  static key : string = 'Repository'
  static db : Object = db.createInstance({name: Repository.key})

  static get(uuid : string) : Promise {
    return Repository
      .db
      .getItem(uuid)
      .then(rawRepo => {
        const repo = new Repository(rawRepo.uuid, rawRepo.name, rawRepo.fullName, rawRepo.remotePath, rawRepo.localPath)
        return Promise.resolve(repo)
      })
  }

  uuid : string
  name : string
  fullName : string
  remotePath : string
  localPath : string

  constructor(uuid : string, name : string, fullName : string, remotePath : string, localPath : string) {
    this.uuid = uuid
    this.name = name
    this.fullName = fullName
    this.remotePath = remotePath
    this.localPath = localPath
  }

  save() : Promise {
    return Repository
      .db
      .setItem(this.uuid, this)
  }

}
