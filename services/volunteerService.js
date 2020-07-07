// Require volunteer dao
const { VolunteerDao } = require('../dao')

/*
    PostService extends PostDao to access it's methods
*/

class VolunteerService extends VolunteerDao {
  constructor (options = {}) {
    super()
    this.options = options
  }

  async retrieveUser(context) {
    try {
      const user = await this.getUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

}

module.exports = VolunteerService