// Import dependencies
const session = require('express-session')
const cookieparser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy

// Import Dao's
const { UserDao } = require('../dao')

/*
    AuthService extends Dao's to access it's methods
    then it adds additional functionalities 
*/
class AuthService {
  constructor (options = {}) {
    this.options = options
    this.app = options.app
    this.UserDao = new UserDao()
  }

  // Set conditions and dependencies needed to use for user authentication
  initialize () {
    const config = this.sessionConfig()
    this.app.use(session(config))
    this.app.use(cookieparser())

    // Serialize user session
    passport.serializeUser((user, done) => this.serialize(user, done))

    // Deserialize session
    passport.deserializeUser((userId, done) => this.deSerialize(userId, done))

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
      secret: process.env.SECRET,
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
  async deSerialize (userId, done) {
      const UserDao = this.UserDao
    const user = await UserDao.getUser({ _id: userId })
    console.log(user)
      return done(null, user)
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

  githubStrategy() {

    return new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:8080/v1/api/auth/github/callback'
        // callbackURL: 'https://www.vogi.ca/v1/api/auth/github/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await this.UserDao.getUser({ githubId: profile.id })

        if (!user) {
          try {
            // no user with this github account is on file,
            // so create a new user and membership for this github user
            const { id, login, avatar_url, name, email, url } = profile['_json']

            user = await this.UserDao.newUser({
              githubId: id,
              avatar: avatar_url,
              url,
              name,
              email,
              username: login,
              accessToken
              // refreshToken
            })
          } catch (err) {
            console.error(err)
            return done(err, null)
          }
        }
        // tell the strategy we found the user
        return done(null, user)
      }
    )
  }
}

module.exports = AuthService
