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
}

module.exports = UserService
