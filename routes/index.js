const Router = require('express').Router()

// Require all Routes
const PartnerRoute = require('../routes/partners')
const VolunteerRoute = require('../routes/volunteers')
const AuthRoute = require('../routes/authRoutes')

// Require all Services
const { PartnerService, VolunteerService, AuthService } = require('../services')

/*
    *Function: 
    Initialize all routes


*/
const initializeRoutes = app => {
  const routesArray = [
    new PartnerRoute({ PartnerService, Router }),
    new VolunteerRoute({ VolunteerService, Router }),
    new AuthRoute({ Router })
  ]

  routesArray.forEach(route => {
    route.initialize()
    app.use(route.router)
  })
}

module.exports = initializeRoutes
