// Require user dao
const { UserDao } = require('../dao')

/*
    User service extends UserDao to access it's methods
*/

class UserService extends UserDao {
  constructor (options = {}) {
    super()
    this.options = options
  }

  // Retrieve the current user and return it
  // No modifications from UserDao
  async retrieveUser (context) {
    try {
      const user = await this.getUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

  // Update a partner user with type, name and about
  // No modifications from UserDao
  async changePartner (context) {
    try {
      const updatedPartner = await this.modifyPartner(context)
      return updatedPartner
    } catch (err) {
      throw err
    }
  }

  // Update a volunteer user with firstname, lastname, skills, and about
  // No modifications from UserDao
  async changeVolunteer (context) {
    try {
      const updatedVolunteer = await this.modifyVolunteer(context)
      return updatedVolunteer
    } catch (err) {
      throw err
    }
  }

  // Create a new user
  // No modifications from UserDao
  async createUser (context) {
    try {
      const user = await this.newUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

  // Update the user
  // No modifications from UserDao
  async updatedUser (context) {
    try {
      const user = await this.update(context)
      return user
    } catch (err) {
      throw err
    }
  }
}

module.exports = UserService
