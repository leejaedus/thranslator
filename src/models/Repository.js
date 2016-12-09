import db from '../db'

export default class Repository {

  static key : string = 'Repository'
  static db : Object = db.createInstance({name: Repository.key})
  static fromObject(rawRepo: Object): Repository {
    return new Repository(rawRepo.uuid, rawRepo.name, rawRepo.fullName, rawRepo.description, rawRepo.sshUrl, rawRepo.localPath)
  }
  static get(uuid : string) : Promise {
    return Repository
      .db
      .getItem(uuid)
      .then(rawRepo => {
        const repo = Repository.fromObject(rawRepo)
        return Promise.resolve(repo)
      })
  }

  uuid : string
  name : string
  fullName : string
  description : string
  sshUrl : string
  localPath : string

  constructor(uuid : string, name : string, fullName : string, description : string, sshUrl : string, localPath : string) {
    this.uuid = uuid
    this.name = name
    this.fullName = fullName
    this.description = description
    this.sshUrl = sshUrl
    this.localPath = localPath
  }

  save() : Promise {
    return Repository
      .db
      .setItem(this.uuid, this)
      .then(() => Promise.resolve(this))
  }

}
