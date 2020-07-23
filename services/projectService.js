// Require project dao
const { ProjectDao } = require('../dao')

/*
    Project service extends ProjectDao to access it's methods
*/

class ProjectService extends ProjectDao {
  constructor (options = {}) {
    super()
    this.options = options
  }

  // Retrieves all projects created using the method from ProjectDao
  // then filters out any projects the user has already joined
  // returns the filtered projects
  async retrieveProjects (context) {
    try {
      const projects = await this.getAvailableProjects()
      const filteredProjects = projects.filter(project => {
        return !project.team.includes(context.userID)
      })
      return filteredProjects
    } catch (err) {
      throw err
    }
  }

  // Deletes the project using the ProjectDao method and returns the projects
  // No modifications from ProjectDao
  async deleteProject (context) {
    try {
      const projects = await this.eraseProject(context)
      return projects
    } catch (err) {
      throw err
    }
  }

  // Creates a new project using the ProjectDao method
  // Returns the new project
  // No modifications from ProjectDao
  async createProject (context) {
    try {
      const project = await this.newProject(context)
      return project
    } catch (err) {
      throw err
    }
  }
  // Updates the project with the volunteer who joined the project in ProjectDao
  // No modifications from ProjectDao
  async updateProject (context) {
    try {
      const project = await this.joinProject(context)
      return project
    } catch (err) {
      throw err
    }
  }
}

// Export the Project Service
module.exports = ProjectService
