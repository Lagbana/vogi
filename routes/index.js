const Router = require('express').Router()

// Require all Routes
const UserRoute = require('../routes/userRoutes')
const AuthRoute = require('../routes/authRoutes')
const ProjectRoute = require('../routes/projectRoutes')

// Require all Services
const { UserService, ProjectService, GithubService } = require('../services')

/*
    *Function: 
    Initialize all routes
*/
const initializeRoutes = app => {
  const routesArray = [
    new UserRoute({ UserService, Router }),
    new AuthRoute({ Router }),
    new ProjectRoute({ ProjectService, GithubService, Router })
  ]

  routesArray.forEach(route => {
    route.initialize()
    app.use(process.env.PREFIX, route.router)
  })
}

module.exports = initializeRoutes
