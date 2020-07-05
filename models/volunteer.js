const mongoose = require('mongoose')
const Schema = mongoose.Schema

const volunteerSchema = new Schema({
  username: { type: String },
  password: { type: String }
})

const Volunteer = mongoose.model('Volunteer', volunteerSchema)

module.exports = Volunteer
