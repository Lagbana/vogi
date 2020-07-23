// Import dependencies
// Use bcrypt and WORK_FACTOR to hash the password
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const WORK_FACTOR = 10

const Schema = mongoose.Schema

// User Schema with role, tokens, username, password,projects
// For volunteers (firstName, lastName, skills and about)
// For partners (organizationType, organizationAbout and organizationSkills)
const UserSchema = new Schema(
  {
    role: {
      type: String
    },
    accessToken: String,
    refreshToken: String,
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    organizationType: {
      type: String
    },
    organizationName: {
      type: String
    },
    organizationAbout: {
      type: String
    },
    volunteerFirstName: {
      type: String
    },
    volunteerLastName: {
      type: String
    },
    volunteerSkills: {
      type: String
    },
    volunteerAbout: {
      type: String
    }
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
// Export the User model
module.exports = User
