const Router = require('express').Router()

// Require all Routes
const UserRoute = require('../routes/userRoutes')
const AuthRoute = require('../routes/authRoutes')

// Require all Services
const { UserService } = require('../services')

/*
    *Function: 
    Initialize all routes
*/
const initializeRoutes = app => {
  const routesArray = [
    new UserRoute({ UserService, Router }),
    new AuthRoute({ Router })
  ]

  routesArray.forEach(route => {
    route.initialize()
    app.use(process.env.PREFIX, route.router)
  })
}

module.exports = initializeRoutes
