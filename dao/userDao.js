// Require volunteer model
const { User, Project } = require('../models')

// User Dao Class with database querying methods
class UserDao {
  constructor (options = {}) {
    this.options = options
    this.user = User
    this.project = Project
  }

  /*
      *method to get the user using the findOne query
      context = req.body, to be inserted in the associated route handler
  */
  async getUser (context) {
    try {
      const user = await this.user.findOne(context)
      // const populatedUser = await user.populate('projects')
      console.log(user)
      return user
    } catch (err) {
      throw err
    }
  }

  /*
      *method to create new user with the create query
      context = req.body, to be inserted in the associated route handler
  */
  async newUser (context) {
    try {
      const newUser = await this.user.create(context)
      return newUser
    } catch (err) {
      throw err
    }
  }

  /*
      *method to update existing user with the create query
      context = req.body, to be inserted in the associated route handler
  */
  async update (context) {
    try {
      const updatedUser = await this.user.findOneAndUpdate(
        { _id: context.id },
        context,
        { new: true }
      )
      return updatedUser
    } catch (err) {
      throw err
    }
  }
}

module.exports = UserDao
