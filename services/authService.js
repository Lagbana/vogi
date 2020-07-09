// Import dependencies
const session = require('express-session')
const cookieparser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy

// Import Dao's
const { PartnerDao } = require('../dao')
const { VolunteerDao } = require('../dao')

/*
    AuthService extends Dao's to access it's methods
    then it adds additional functionalities 
*/
class AuthService {
  constructor (options = {}) {
    super()
    this.options = options
    this.app = options.app
    this.VolunteerDao = VolunteerDao
    this.PartnerDao = PartnerDao
  }

  // Set conditions and dependencies needed to use for volunteer authentication
  initialize () {
    const config = this.sessionConfig()
    this.app.use(session(config))
    this.app.use(cookieparser())

    // Serialize volunteer and partner session
    passport.serialize((user, done) => this.serialize(user, done))

    // Deserialize session based on the 'partner' OR 'volunteer' flag
    passport.deserializeUser((userId, done) =>
      this.deSerialize(userId, done, 'partner')
    )
    passport.deserializeUser((userId, done) =>
      this.deSerialize(userId, done, 'volunteer')
    )

    // Register passport strategies
    passport.use(this.localStrategy())
    passport.use(this.githubStrategy())

    this.app.use(passport.initialize())

    // this adds passport from middleware
    this.app.use(passport.session())
  }

  sessionConfig () {
    return {
      // We need to modify the secret below with encrypted values for the production build
      secret: 'Two full stack developers walked in to a remote bar....',
      resave: false,
      saveUninitialized: false,
      // rolling: true => automatically extends the session age on each request.
      // Allows user's activity to extend their session
      rolling: true,
      name: 'cookie-monster',
      cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000 // 20 minutes per active cookie (in milliseconds)
        // domain:'www.vogi.ca' // restricts the cookies to our domain in production
        // secure: true // for HTTPS connections when Vogi is in secure production
      }
    }
  }

  // *method  => tells Passort to save the User ID in the session cookie
  serialize (user, done) {
    done(null, user._id)
  }

  /*
  * method => tells Passport how to turn the User ID we serialize in the session cookie
   back into the original User record from our Mongo database
   making the User ID available on each authenticated request via the req.user property
  */
  async deSerialize (userId, done, flag) {
    try {
      if (flag === 'volunteer') {
        const VolunteerDao = this.VolunteerDao
        const volunteer = await VolunteerDao.getUser({ _id: userId })
        return done(null, volunteer)
      } else {
        const PartnerDao = this.PartnerDao
        const partner = await PartnerDao.getPartner({ _id: userId })
        return done(null, partner)
      }
    } catch (err) {
      console.error(err)
      done(err)
    }
  }

  localStrategy () {
    return new LocalStrategy(async (username, password, done) => {
      const errorMsg = 'Invalid username or password'
      this.getUser({ username })
        .then(user => {
          // if no matching user was found...
          if (!user) {
            return done(null, false, { message: errorMsg })
          }

          // call our validate method, which will call done with the user if the
          // passwords match, or false if they don't
          return user
            .validatePassword(password)
            .then(isMatch =>
              done(
                null,
                isMatch ? user : false,
                isMatch ? null : { message: errorMsg }
              )
            )
        })
        .catch(done)
    })
  }

  githubStrategy () {
    return new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:8080/v1/api/auth/github/callback'
        // callbackURL: 'https://www.vogi.ca/v1/api/auth/github/callback'
      },
      async (accessToken, refreshToken, profile, cb) => {
        let user = await this.VolunteerDao.getUser({ githubId: profile.id })
        if (!user) {
          const { id, login } = profile['_json']
          user = await this.createUser({
            githubId: id,
            username: login
          })
        }
        return cb(null, user)
      }
    )
  }
}

module.exports = AuthService
