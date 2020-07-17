const passport = require('passport')
// Authentication check middleware
const mustBeLoggedIn = require('../config/mustBeLoggedIn')

class UserRoute {
  constructor (options = {}) {
    this.options = options
    this.router = options.Router
    this.UserService = new options.UserService()
  }

  initialize () {
    this.router.put('/users', (req, res) => this.updateUser(req, res))
    this.router.post(
      '/users',
      (req, res, next) => {
        this.createUser(req, res, next)
      }
    )
    this.router.get('/users', (req, res) => this.retrieveUsers(req, res))
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

  async getRestricted (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async createUser (req, res, next) {
    try {
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
        res.status(400).json({ message: 'Username already in use.' })
      }
      next(err)
    }
  }

  // async createPartner (req, res, next) {
  //   try {
  //     const newUser = await this.UserService.createUser(req.body)
  //     const { id, username } = newUser
  //     res.json({ id, username })
  //   } catch (err) {
  //     // If this error code is shown that means the username already exists
  //     // We can nicely redirect to the signup screen with this message

  //     if (err.code === 11000) {
  //       res.status(400).json({ message: 'Username already in use.' })
  //     }
  //     next(err)
  //   }
  // }

  // Get request for multiple data
  async retrieveUsers (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }
}

module.exports = UserRoute
