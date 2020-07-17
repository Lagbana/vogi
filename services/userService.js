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

  async retrieveUser (context) {
    try {
      const user = await this.getUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

  async changePartner (context) {
    try {
      const updatedPartner = await this.modifyPartner(context)
      return updatedPartner
    } catch (err) {
      throw err
    }
  }

  async changeVolunteer (context) {
    try {
      const updatedVolunteer = await this.modifyVolunteer(context)
      return updatedVolunteer
    } catch (err) {
      throw err
    }
  }

  async createUser (context) {
    try {
      const user = await this.newUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

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
