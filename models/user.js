const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const WORK_FACTOR = 10

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    role: {
      type: String,
      default: 'Volunteer'
    },
    githubId: {
      type: String,
      required: true
    },
    accessToken: String,
    refreshToken: String,
    avatar: {
      type: String,
      required: true
    },
    url: String,
    email: {
      type: String
      // required: true
    },
    // githubName: {
    //   type: String
    // },
    name: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    password: String
  },
  {
    timestamps: true
  }
)

// This pre "save" handler will be called before each time the user is saved.
// it will convert the plaintext password into a securely hashed version so that
// the original plaintext password is never stored in the database

UserSchema.pre('save', function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }

  // generate a salt
  bcrypt.genSalt(WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      // let mongoose know we're done now that we've hashed the plaintext password
      next()
    })
  })
})

// Here, we define a method that will be available on each instance of the User.
// This method will validate a given password with the actual password, and resolve
// true if the password is a match, or false if it is not.
UserSchema.methods.validatePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
}

const User = mongoose.model('User', UserSchema)
module.exports = User
