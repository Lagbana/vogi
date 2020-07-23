// Require volunteer model
const { Project, User } = require('../models')

// Project Dao Class with database querying methods
class ProjectDao {
  constructor (options = {}) {
    this.options = options
    this.project = Project
    this.user = User
  }

  /*
   *Method to retrieve all projects in the database
   */
  async getAvailableProjects (context) {
    try {
      const projects = await this.project.find({})
      return projects
    } catch (err) {
      throw err
    }
  }

  /*
   *Method to create a new project in the database
   *Also update the partner user with the project that they have created
   *Push the project ID into projects field to keep track of the projects the user has created
   */
  async newProject (context) {
    try {
      const newProject = await this.project.create(context)

      const user = await this.user.findOneAndUpdate(
        { _id: context.userID },
        { $push: { projects: newProject._id } },
        { new: true }
      )
      return newProject
    } catch (err) {
      throw err
    }
  }

  /*
      *method to delete a project with the delete query
      context = req.body, to be inserted in the associated route handler
  */
  async eraseProject (context) {
    try {
      const res = await this.project.deleteOne(context)
      return res
    } catch (err) {
      throw err
    }
  }

  /*
   *Method for a volunteer to join a project
   *Project is update with team member ID and user is updated with project IDs
   */
  async joinProject (context) {
    console.log(context)
    try {
      const updatedProject = await this.project.findOneAndUpdate(
        { _id: context.projectID },
        { $push: { team: context.userID } },
        { new: true }
      )

      const updatedUser = await this.user.findOneAndUpdate(
        { _id: context.userID },
        { $push: { projects: context.projectID } },
        { new: true }
      )
      return updatedProject
    } catch (err) {
      throw err
    }
  }
}
// Export Project Dao
module.exports = ProjectDao
