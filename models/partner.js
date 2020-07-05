const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partnerSchema = new Schema({
  username: { type: String },
  password: { type: String }
})

const Partner = mongoose.model('Partner', partnerSchema)

module.exports = Partner
