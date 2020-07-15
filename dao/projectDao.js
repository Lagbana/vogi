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
      // await db.User.findOneAndUpdate(
      //   { _id: currentUser._id },
      //   { $push: { notes: newNote._id } },
      //   { new: true }
      // )

      const user = await this.user.findOneAndUpdate(
        { _id: context.userID },
        { $push: { projects: newProject._id } },
        { new: true }
      )
      console.log(user.projects)
      return newProject
    } catch (err) {
      throw err
    }
  }
}

module.exports = ProjectDao
