// Require user dao
const { ProjectDao } = require('../dao')

/*
    User service extends UserDao to access it's methods
*/

class ProjectService extends ProjectDao {
  constructor (options = {}) {
    super()
    this.options = options
  }

  async retrieveProjects () {
    try {
      const projects = await this.getProjects()
      return projects
    } catch (err) {
      throw err
    }
  }

  async createProject (context) {
    try {
      const project = await this.newProject(context)
      return project
    } catch (err) {
      throw err
    }
  }
}

module.exports = ProjectService
