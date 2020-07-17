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
  async modifyVolunteer (context) {
    const { first, last, skills, about, id } = context
    try {
      const updatedVolunteer = await this.user.findOneAndUpdate({
        id: id,
        volunteerFirstName: first,
        volunteerLastName: last,
        volunteerSkills: skills,
        volunteerAbout: about
      })
      return updatedVolunteer
    } catch (err) {
      throw err
    }
  }
  async modifyPartner (context) {
    const { id, name, type, about } = context
    try {
      const updatedVolunteer = await this.user.findOneAndUpdate({
        id: id,
        organizationType: type,
        organizationName: name,
        organizationAbout: about
      })
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
