// Require user dao
const sgMail = require('@sendgrid/mail')
const bcrypt = require('bcrypt')
const { UserDao } = require('../dao')

/*
    User service extends UserDao to access it's methods
*/

class UserService extends UserDao {
  constructor (options = {}) {
    super()
    this.options = options
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async retrieveUser (context) {
    try {
      const user = await this.getUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

  async changePartner (context) {
    try {
      const updatedPartner = await this.modifyPartner(context)
      return updatedPartner
    } catch (err) {
      throw err
    }
  }

  async changeVolunteer (context) {
    try {
      const updatedVolunteer = await this.modifyVolunteer(context)
      return updatedVolunteer
    } catch (err) {
      throw err
    }
  }

  async createUser (context) {
    try {
      const user = await this.newUser(context)
      return user
    } catch (err) {
      throw err
    }
  }

  async updatedUser (context) {
    try {
      const user = await this.update(context)
      return user
    } catch (err) {
      throw err
    }
  }

  async _hashPassword (password) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (err) {
      throw err
    }
  }

  async setToken ({ token, email }) {
    try {
      const response = await this.update({ email, token, isResetToken: true })
      const msg = {
        to: email,
        from: 'dontreply@workoo.co', // Use the email address or domain you verified above
        subject: 'Reset Password Token',
        html: `<strong>
                <a href="http://localhost:3000/reset/${token}">
                  http://localhost:3000/reset/${token}
                </a>
              </strong>`
      }
      const sendEmail = await sgMail.send(msg)
      return { response, sendEmail }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async resetPassword ({ token, password }) {
    try {
      const encrypted = await this._hashPassword(password)
      const newUser = await this.update({
        password: encrypted,
        token,
        shouldUpdatePassword: true
      })
      return newUser
    } catch (err) {
      throw err
    }
  }
}

module.exports = UserService
