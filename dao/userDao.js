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
      const user = await this.user.findOne(context).populate('projects')
      return user
    } catch (err) {
      throw err
    }
  }

  /*
   *Method to modify volunteer user with first, last, skills and about
   *Find by the id
   */
  async modifyVolunteer (context) {
    const { first, last, skills, about, id } = context
    try {
      const updatedVolunteer = await this.user.findOneAndUpdate(
        {
          _id: id
        },
        {
          volunteerFirstName: first,
          volunteerLastName: last,
          volunteerSkills: skills,
          volunteerAbout: about
        }
      )
      return updatedVolunteer
    } catch (err) {
      throw err
    }
  }
  /*
   *Method to modify volunteer user with first, last, skills and about
   *Find by the id
   */
  async modifyPartner (context) {
    const { id, name, type, about } = context
    try {
      const updatedVolunteer = await this.user.findOneAndUpdate(
        {
          _id: id
        },
        {
          organizationType: type,
          organizationName: name,
          organizationAbout: about
        }
      )
      return updatedVolunteer
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

  // Private method
  // Find user by username(email) and add token
  async _setToken (context) {
    try {
      const { email, token } = context
      const response = await User.findOneAndUpdate(
        { username: email },
        {
          $push: { tokens: token }
        }
      )
      return response
    } catch (err) {
      throw err
    }
  }

  // Private method
  // Find a user with the token param and update the user's password
    async _updatePassword (context) {
    try {
      const { token, password } = context
      const query = { tokens: { $in: [token] } }
      const user = await User.findOne(query)
      const updatedUser = await this.user.findOneAndUpdate(
        { _id: user._id },
        { password },
        { new: true }
      )
      await User.updateOne(query, { $pull: { tokens: token } }, { multi: true })
      return updatedUser
    } catch (err) {
      throw err
    }
  }

  /*
      *method to update existing user with the findOneAndUpdate query
      context = req.body, to be inserted in the associated route handler
  */
  async update (context) {
    try {
      // Check to see if isResetToken === true and set the token using the
      // _setToken private method
      if (context && context.isResetToken) return await this._setToken(context)

      // Check to see if shouldUpdatePassword === true and update password using the
      // _updatePassword private method
      if (context && context.shouldUpdatePassword)
        return await this._updatePassword(context)

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
// Export the UserDao
module.exports = UserDao
