const passport = require('passport')

class AuthRoute {
  constructor (options = {}) {
    this.options = options
    this.router = options.Router
  }

  initialize () {
    // Github Auth Sign up / Login
    this.router.get(
      '/auth/github',
      passport.authenticate('github', { scope: ['user:email'] })
    )

    this.router.get(
      '/auth/github/callback',
      passport.authenticate('github', {
        failureRedirect: 'http://127.0.0.1:3000/login'
      }),
      (req, res) => {
        res.redirect('http://127.0.0.1:3000/user/dashboard')
      }
    )

    // Local Auth Strategy
    this.router.get('/auth', (req, res) => this.auth(req, res))
    this.router.post('/auth', passport.authenticate('local'), (req, res) =>
      this.createAuth(req, res)
    )
    this.router.delete('/auth', (req, res) => this.logoutAuth(req, res))
  }

  // GET to /auth will return current logged in user info
  async auth (req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'You are not currently logged in.'
        })
      }
      return this.getCurrentUser(req, res)
    } catch (err) {
      throw err
    }
  }

  async createAuth (req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'Invalid username or password.'
        })
      }
      return this.getCurrentUser(req, res)
    } catch (err) {
      throw err
    }
  }

  async logoutAuth (req, res) {
    try {
      req.logout()
      req.session.destroy()
      res.json({
        message: 'You have been successfully logged out'
      })
    } catch (err) {
      throw err
    }
  }

  async getCurrentUser (req, _) {
    const user = req.user
    return res.json(user)
  }
}

module.exports = AuthRoute
