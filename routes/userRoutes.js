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
    this.router.get('/user', (req, res) => this.retrieveUser(req, res))
    this.router.post('/users', (req, res) => this.createUser(req, res, next))
    // this.router.get('/stuff', mustBeLoggedIn, (req, res) => this.getRestricted(req, res))
    this.router.get('/users', (req, res) => this.retrieveUsers(req, res))
  }

  async retrieveUser (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }

  
  async getRestricted (req, res) {
    try {

    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }
  }
  
  async createUser (req, res, next) {
    try {
      const newUser = await this.UserService.createUser(req.body)
      const { id, username } = newUser
      res.json({ id, username })
    } catch (err) {
      
      // If this error code is shown that means the username already exists
      // We can nicely redirect to the signup screen with this message
      
      if (err.code === 11000) {
        res.status(400).json({ message: 'Username already in use.' })
      }
      throw err
    }
  }

  // Get request for multiple data
  async retrieveUsers (req, res) {
    try {
    } catch (err) {
      console.error(error.response.body.err)
      throw err
    }

  }
}

module.exports = UserRoute
