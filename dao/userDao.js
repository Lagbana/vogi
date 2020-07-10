// Require volunteer model
const { User } = require('../models')

// User Dao Class with database querying methods
class UserDao {
  constructor (options = {}) {
    this.options = options
    this.user = User
  }

  /*
      *method to get the user using the findOne query
      context = req.body, to be inserted in the associated route handler
  */
  async getUser(context) {
    try {
      const user = await this.user.findOne(context)
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
}

module.exports = UserDao
