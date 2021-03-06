// Import dependencies
const passport = require('passport')
// Authentication check middleware
const mustBeLoggedIn = require('../config/mustBeLoggedIn')
const crypto = require('crypto')

// UserRoute Class
class UserRoute {
  // Use the constructor to create methods
  constructor (options = {}) {
    this.options = options
    this.router = options.Router
    this.UserService = new options.UserService()
  }

  // Initialize the routes
  initialize () {
    // Update user route
    this.router.put('/users', (req, res) => this.updateUser(req, res))
    // Create user route
    this.router.post('/users', (req, res, next) => {
      this.createUser(req, res, next)
    })
    // Get users route
    this.router.get('/users', (req, res) => this.retrieveUsers(req, res))
    // Update a volunteer user
    this.router.put('/users/volunteer', (req, res) =>
      this.updateVolunteer(req, res)
    )
    // Update a partner user
    this.router.put('/users/partner', (req, res) =>
      this.updatePartner(req, res)
    )
    // Send an email to the user with a link to update the password
    this.router.post('/reset', (req, res) => this.resetPasswordEmail(req, res))

    // Reset password using the generated token as verfication
    this.router.post('/reset/:token', (req, res) =>
      this.resetPassword(req, res)
    )
  }

  // Update users who sign up via GitHub with their roles
  async updateUser (req, res) {
    try {
      const { role } = req.query
      // Check to see role and user exists and no role exists in the database already
      if (role && req.user && !req.user.role) {
        const updatedUser = await this.UserService.updatedUser({
          id: req.user._id,
          role
        })
        return res.send(updatedUser)
      }
      res.send(req.user)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // Update a partner user
  async updatePartner (req, res) {
    try {
      // Pass in the req.body and the userid and call the changePartner method from UserService
      // Update information for organization type, name and about
      const updatedPartner = await this.UserService.changePartner({
        ...req.body,
        id: req.user._id
      })
      return res.json(updatedPartner)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async updateVolunteer (req, res) {
    try {
      // Pass in the req.body and the userid and call the changeVolunteer method from UserService
      // Update information for first name, last name, skills and about
      const updatedVolunteer = await this.UserService.changeVolunteer({
        ...req.body,
        id: req.user._id
      })
      return res.json(updatedVolunteer)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  // Get the restricted route
  async getRestricted (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // Create a new user
  async createUser (req, res, next) {
    try {
      // Using the UserService, pass in the req.body to create a new user
      const newUser = await this.UserService.createUser({
        ...req.body,
        username: req.body.username
      })
      const { _id, username, role } = newUser
      req.login(newUser, err => {
        if (err) console.log(err)
        return res.json({ _id, username, role })
      })
    } catch (err) {
      // If this error code is shown that means the username already exists
      // We can nicely redirect to the signup screen with this message

      if (err.code === 11000) {
        res.status(400).json({ message: 'That email already exists.' })
      }
      next(err)
    }
  }

  // Get request for multiple data
  async retrieveUsers (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }

  // Receieve the email from request body and generate a token
  // Update the user collection with the generated token
  async resetPasswordEmail (req, res) {
    try {
      const { email } = req.body
      if (!email) throw new Error('Email is required in request body')
      const buffer = crypto.randomBytes(20)
      const token = buffer.toString('hex')
      await this.UserService.setToken({ token, email })
      res.send({
        msg: 'Reset password message was successfully sent',
        status: 200
      })
    } catch (err) {
      throw err
    }
  }

  // Receieve the password from request body and token from param
  // Reset the verified user with the new password
  async resetPassword (req, res) {
    try {
      const { password } = req.body
      const { token } = req.params
      if (!password || !token)
        throw new Error('Password and token are required to fufil this request')
      const user = await this.UserService.resetPassword({ token, password })

      return res.json(user)
    } catch (err) {
      res.send({
        msg: 'Something went wrong 🤯',
        status: 400
      })
      throw err
    }
  }
}
// Export the user route
module.exports = UserRoute
