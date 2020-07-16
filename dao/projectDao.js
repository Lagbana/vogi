// Require volunteer model
const { Project, User } = require('../models')

// User Dao Class with database querying methods
class ProjectDao {
  constructor (options = {}) {
    this.options = options
    this.project = Project
    this.user = User
  }

  /*
      *method to get the user using the findOne query
      context = req.body, to be inserted in the associated route handler
  */
  async getProjects () {
    try {
      const projects = await this.project.find({})
      return projects
    } catch (err) {
      throw err
    }
  }

  /*
      *method to create new user with the create query
      context = req.body, to be inserted in the associated route handler
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
      return res.deletedCount
    } catch (err) {
      throw err
    }
  }
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

module.exports = ProjectDao
