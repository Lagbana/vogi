const db = require('../models')

// Defining methods for the bookController
module.exports = {
  findAll: function (req, res) {
    db.Volunteer.find(req.query)
      .then(dbVolunteer => res.json(dbVolunteer))
      .catch(err => res.status(422).json(err))
  },
  create: function (req, res) {
    db.Volunteer.create(req.body)
      .then(dbVolunteer => res.json(dbVolunteer))
      .catch(err => res.status(422).json(err))
  }
}
